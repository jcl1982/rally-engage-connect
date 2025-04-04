
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { eventSchema, EventFormValues, Event } from "./eventFormSchema";
import BasicEventInfoTab from "./BasicEventInfoTab";
import DetailedEventInfoTab from "./DetailedEventInfoTab";
import { useEventForm } from "@/hooks/useEventForm";

interface EventFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: Event | null;
  onEventSaved: () => void;
}

const EventFormDialog = ({ open, onOpenChange, event, onEventSaved }: EventFormDialogProps) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("basic");
  const { isSubmitting, error, handleSubmit } = useEventForm(event, onEventSaved);
  
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
      max_participants: "",
      entry_fee: "",
      regulations_url: "",
      event_type: undefined,
      difficulty_level: undefined,
      total_distance: "",
      contact_email: "",
      contact_phone: "",
    },
  });

  useEffect(() => {
    if (event) {
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);
      
      const formatDateForInput = (date: Date) => {
        return date.toISOString().split('T')[0];
      };

      form.reset({
        title: event.title,
        description: event.description || "",
        location: event.location,
        start_date: formatDateForInput(startDate),
        end_date: formatDateForInput(endDate),
        status: event.status as "draft" | "published" | "cancelled",
        image_url: event.image_url || "",
        max_participants: event.max_participants !== null ? String(event.max_participants) : "",
        entry_fee: event.entry_fee !== null ? String(event.entry_fee) : "",
        regulations_url: event.regulations_url || "",
        event_type: event.event_type as any || undefined,
        difficulty_level: event.difficulty_level as any || undefined,
        total_distance: event.total_distance || "",
        contact_email: event.contact_email || "",
        contact_phone: event.contact_phone || "",
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
        max_participants: "",
        entry_fee: "",
        regulations_url: "",
        event_type: undefined,
        difficulty_level: undefined,
        total_distance: "",
        contact_email: "",
        contact_phone: "",
      });
    }
  }, [event, form]);

  const onSubmit = async (data: EventFormValues) => {
    if (user) {
      await handleSubmit(data, user.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="basic">Infos de base</TabsTrigger>
                <TabsTrigger value="details">Détails de l'épreuve</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-4">
                <BasicEventInfoTab form={form} />
              </TabsContent>

              <TabsContent value="details" className="space-y-6 mt-4">
                <DetailedEventInfoTab form={form} />
              </TabsContent>
            </Tabs>

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
                className="bg-asag-red hover:bg-asag-red/90"
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
