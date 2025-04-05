
import { supabase } from "@/integrations/supabase/client";
import { EventFormValues } from "./eventSchema";
import { User } from "@supabase/supabase-js";

export const submitEventForm = async (
  data: EventFormValues, 
  user: User | null, 
  eventId?: string
): Promise<{ success: boolean; error: string | null }> => {
  if (!user) return { success: false, error: "Utilisateur non connecté" };
  
  try {
    if (eventId) {
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
        .eq("id", eventId);

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

    return { success: true, error: null };
  } catch (error: any) {
    console.error("Erreur lors de l'enregistrement de l'événement:", error);
    return { success: false, error: error.message || "Une erreur est survenue" };
  }
};

// Utility for formatting dates for form inputs
export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
