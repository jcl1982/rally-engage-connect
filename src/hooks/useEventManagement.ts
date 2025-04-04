
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export type Event = {
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
};

export function useEventManagement() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");

  const fetchEvents = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("events" as any)
        .select("*")
        .eq("organizer_id", user.id)
        .order("start_date", { ascending: true });

      if (error) throw error;
      
      const safeData = data as unknown as Event[];
      setEvents(safeData);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des événements:", error.message);
      toast.error("Impossible de charger les événements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  const filteredEvents = (tabValue: string) => {
    return tabValue === "all" 
      ? events 
      : events.filter(event => event.status === tabValue);
  };

  return { 
    events, 
    loading, 
    fetchEvents, 
    activeTab, 
    setActiveTab, 
    filteredEvents 
  };
}
