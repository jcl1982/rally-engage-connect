
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export interface Event {
  id: string;
  title: string;
  description: string | null;
  location: string;
  start_date: string;
  end_date: string;
  status: string;
  image_url: string | null;
  organizer_id: string;
  created_at: string;
  updated_at: string;
  participants?: number;
}

export interface DashboardStats {
  eventsCount: number;
  participantsCount: number;
  vehiclesCount: number;
}

export function useOrganizerEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    eventsCount: 0,
    participantsCount: 0,
    vehiclesCount: 0
  });

  const fetchEvents = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      // Récupérer les événements de l'organisateur
      const { data: eventsData, error: eventsError } = await supabase
        .from("events" as any)
        .select("*")
        .eq("organizer_id", user.id)
        .order("start_date", { ascending: true });
      
      if (eventsError) throw eventsError;
      
      const typedEvents = eventsData as unknown as Event[];
      setEvents(typedEvents);

      // Calculer les statistiques
      setStats({
        eventsCount: typedEvents.length,
        participantsCount: 87, // À remplacer par une vraie requête quand la table des participants sera créée
        vehiclesCount: 42 // À remplacer par une vraie requête quand la table des véhicules sera créée
      });
    } catch (error: any) {
      console.error("Erreur lors du chargement des événements:", error.message);
      toast.error("Impossible de charger vos événements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  return { events, stats, loading, fetchEvents };
}
