
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";

import { eventSchema, EventFormValues } from "./utils/eventSchema";
import { submitEventForm, formatDateForInput } from "./utils/eventFormHandlers";
import BasicInfoFields from "./form-fields/BasicInfoFields";
import DateLocationFields from "./form-fields/DateLocationFields";
import StatusImageFields from "./form-fields/StatusImageFields";

interface EventFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: any | null;
  onEventSaved: () => void;
}

const EventFormDialog = ({ open, onOpenChange, event, onEventSaved }: EventFormDialogProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize form with react-hook-form and zod
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      start_date: "",
      end_date: "",
      status: "draft",
      image_url: "",
    },
  });

  // Update form values when the event changes
  useEffect(() => {
    if (event) {
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);
      
      form.reset({
        title: event.title,
        description: event.description || "",
        location: event.location,
        start_date: formatDateForInput(startDate),
        end_date: formatDateForInput(endDate),
        status: event.status,
        image_url: event.image_url || "",
      });
    } else {
      form.reset({
        title: "",
        description: "",
        location: "",
        start_date: "",
        end_date: "",
        status: "draft",
        image_url: "",
      });
    }
  }, [event, form]);

  const onSubmit = async (data: EventFormValues) => {
    setIsSubmitting(true);
    setError(null);

    const result = await submitEventForm(data, user, event?.id);
    
    if (result.success) {
      onEventSaved();
    } else {
      setError(result.error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{event ? "Modifier l'événement" : "Créer un événement"}</DialogTitle>
          <DialogDescription>
            {event 
              ? "Modifiez les détails de votre événement ci-dessous." 
              : "Remplissez les détails pour créer un nouvel événement."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BasicInfoFields control={form.control} />
            <DateLocationFields control={form.control} />
            <StatusImageFields control={form.control} />

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enregistrement..." : event ? "Mettre à jour" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormDialog;
