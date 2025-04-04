
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

// Schéma de validation pour le formulaire d'événement
const eventSchema = z.object({
  title: z.string().min(3, "Le titre doit comporter au moins 3 caractères"),
  description: z.string().optional(),
  location: z.string().min(3, "La localisation est requise"),
  start_date: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Date de début invalide"
  }),
  end_date: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Date de fin invalide"
  }),
  status: z.enum(["draft", "published", "cancelled"]),
  image_url: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

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
  
  // Initialiser le formulaire avec react-hook-form et zod
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

  // Mettre à jour les valeurs du formulaire lorsque l'événement change
  useEffect(() => {
    if (event) {
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);
      
      // Format YYYY-MM-DD pour les inputs de type date
      const formatDateForInput = (date: Date) => {
        return date.toISOString().split('T')[0];
      };

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
    if (!user) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      if (event) {
        // Mise à jour d'un événement existant
        const { error } = await supabase
          .from("events")
          .update({
            title: data.title,
            description: data.description || null,
            location: data.location,
            start_date: new Date(data.start_date).toISOString(),
            end_date: new Date(data.end_date).toISOString(),
            status: data.status,
            image_url: data.image_url || null,
          })
          .eq("id", event.id);

        if (error) throw error;
      } else {
        // Création d'un nouvel événement
        const { error } = await supabase
          .from("events")
          .insert({
            title: data.title,
            description: data.description || null,
            location: data.location,
            start_date: new Date(data.start_date).toISOString(),
            end_date: new Date(data.end_date).toISOString(),
            status: data.status,
            image_url: data.image_url || null,
            organizer_id: user.id,
          });

        if (error) throw error;
      }

      onEventSaved();
    } catch (error: any) {
      console.error("Erreur lors de l'enregistrement de l'événement:", error);
      setError(error.message || "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Rallye des Grandes Îles" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Description détaillée de l'événement..." 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de début</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de fin</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localisation</FormLabel>
                  <FormControl>
                    <Input placeholder="Guadeloupe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un statut" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="published">Publié</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de l'image</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
