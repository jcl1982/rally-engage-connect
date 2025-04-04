
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import EventList from "./EventList";
import { Event } from "@/hooks/useEventManagement";

interface EventStatusTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  filteredEvents: Event[];
  loading: boolean;
  onCreateEvent: () => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (event: Event) => void;
}

const EventStatusTabs = ({ 
  activeTab, 
  onTabChange, 
  filteredEvents,
  loading, 
  onCreateEvent,
  onEditEvent,
  onDeleteEvent 
}: EventStatusTabsProps) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange} className="mb-8">
      <TabsList>
        <TabsTrigger value="all">Tous</TabsTrigger>
        <TabsTrigger value="draft">Brouillons</TabsTrigger>
        <TabsTrigger value="published">Publiés</TabsTrigger>
        <TabsTrigger value="cancelled">Annulés</TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="mt-6">
        <EventList 
          events={filteredEvents} 
          loading={loading} 
          onEditEvent={onEditEvent}
          onDeleteEvent={onDeleteEvent}
        />
        
        {filteredEvents.length === 0 && !loading && (
          <Button className="mt-4" variant="outline" onClick={onCreateEvent}>
            Créer votre premier événement
          </Button>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default EventStatusTabs;
