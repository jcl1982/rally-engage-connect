
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

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

export const useEventManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const fetchEvents = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Only fetch events created by the current user
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("organizer_id", user.id)
        .order("start_date", { ascending: true });

      if (error) throw error;
      setEvents(data as Event[]);
    } catch (error: any) {
      console.error("Error fetching events:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to load events."
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  const handleCreateEvent = () => {
    setCurrentEvent(null);
    setIsEventFormOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setCurrentEvent(event);
    setIsEventFormOpen(true);
  };

  const handleDeleteEvent = (event: Event) => {
    setCurrentEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const handleEventDeleted = () => {
    setIsDeleteDialogOpen(false);
    fetchEvents();
    toast({
      title: "Event deleted",
      description: "The event has been successfully deleted."
    });
  };

  const handleEventSaved = () => {
    setIsEventFormOpen(false);
    fetchEvents();
    toast({
      title: "Event saved",
      description: "The event has been successfully saved."
    });
  };

  return {
    events,
    loading,
    isEventFormOpen,
    setIsEventFormOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    currentEvent,
    handleCreateEvent,
    handleEditEvent,
    handleDeleteEvent,
    handleEventDeleted,
    handleEventSaved,
  };
};
