
import React, { useState } from "react";
import EventFormDialog from "@/components/events/EventFormDialog";
import DeleteEventDialog from "@/components/events/DeleteEventDialog";
import EventManagementHeader from "@/components/events/EventManagementHeader";
import EventStatusTabs from "@/components/events/EventStatusTabs";
import { useEventManagement, Event } from "@/hooks/useEventManagement";

const EventManagementPage = () => {
  const { 
    loading, 
    activeTab, 
    setActiveTab, 
    filteredEvents, 
    fetchEvents 
  } = useEventManagement();
  
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

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
  };

  const handleEventSaved = () => {
    setIsEventFormOpen(false);
    fetchEvents();
  };

  return (
    <>
      <EventManagementHeader onCreateEvent={handleCreateEvent} />
      
      <EventStatusTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        filteredEvents={filteredEvents(activeTab)}
        loading={loading}
        onCreateEvent={handleCreateEvent}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
      />

      <EventFormDialog
        open={isEventFormOpen}
        onOpenChange={setIsEventFormOpen}
        event={currentEvent}
        onEventSaved={handleEventSaved}
      />

      <DeleteEventDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        event={currentEvent}
        onEventDeleted={handleEventDeleted}
      />
    </>
  );
};

export default EventManagementPage;
