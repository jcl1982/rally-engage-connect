
import React from "react";
import OrganizerEventCard, { EventCardProps } from "./OrganizerEventCard";
import { Button } from "@/components/ui/button";

type Event = EventCardProps['event'];

interface OrganizerEventListProps {
  events: Event[];
  loading: boolean;
  onCreateEvent: () => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (event: Event) => void;
  activeTab: string;
}

const OrganizerEventList = ({
  events,
  loading,
  onCreateEvent,
  onEditEvent,
  onDeleteEvent,
  activeTab
}: OrganizerEventListProps) => {
  const filteredEvents = activeTab === "all" 
    ? events 
    : events.filter(event => event.status === activeTab);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Chargement des événements...</p>
      </div>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Aucun événement trouvé.</p>
        <Button className="mt-4" variant="outline" onClick={onCreateEvent}>
          Créer votre premier événement
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredEvents.map((event) => (
        <OrganizerEventCard
          key={event.id}
          event={event}
          onEdit={onEditEvent}
          onDelete={onDeleteEvent}
        />
      ))}
    </div>
  );
};

export default OrganizerEventList;
