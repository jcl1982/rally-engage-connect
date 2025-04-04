
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { EventFormValues, Event } from "@/components/events/eventFormSchema";
import { toast } from "sonner";

export const useEventForm = (event: Event | null, onSuccess: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: EventFormValues, userId: string) => {
    if (!userId) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const eventData = {
        title: data.title,
        description: data.description || null,
        location: data.location,
        start_date: new Date(data.start_date).toISOString(),
        end_date: new Date(data.end_date).toISOString(),
        status: data.status,
        image_url: data.image_url || null,
        max_participants: data.max_participants === "" ? null : parseInt(data.max_participants || "0", 10),
        entry_fee: data.entry_fee === "" ? null : parseFloat(data.entry_fee || "0"),
        regulations_url: data.regulations_url || null,
        event_type: data.event_type || null,
        difficulty_level: data.difficulty_level || null,
        total_distance: data.total_distance || null,
        contact_email: data.contact_email || null,
        contact_phone: data.contact_phone || null,
      };

      if (event) {
        const { error: updateError } = await supabase
          .from("events")
          .update(eventData)
          .eq("id", event.id);

        if (updateError) throw updateError;
        toast.success("Événement mis à jour avec succès");
      } else {
        const { error: insertError } = await supabase
          .from("events")
          .insert({
            ...eventData,
            organizer_id: userId,
          });

        if (insertError) throw insertError;
        toast.success("Événement créé avec succès");
      }

      onSuccess();
    } catch (err: any) {
      console.error("Erreur lors de l'enregistrement de l'événement:", err);
      setError(err.message || "Une erreur est survenue");
      toast.error("Erreur lors de l'enregistrement de l'événement");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    error,
    handleSubmit
  };
};
