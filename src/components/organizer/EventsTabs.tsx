
import React from "react";
import { Calendar, FileText, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";
import DraftEventCard from "./DraftEventCard";

export interface Event {
  id: string;
  title: string;
  location: string;
  start_date: string;
  end_date: string;
  status: string;
  participants?: number;
}

interface EventsTabsProps {
  events: Event[];
  loading: boolean;
}

const EventsTabs = ({ events, loading }: EventsTabsProps) => {
  // Filter events by status
  const upcomingEvents = events.filter(e => e.status === "published" && new Date(e.end_date) >= new Date());
  const pastEvents = events.filter(e => e.status === "published" && new Date(e.end_date) < new Date());
  const draftEvents = events.filter(e => e.status === "draft");

  return (
    <Tabs defaultValue="upcoming" className="mb-8">
      <TabsList>
        <TabsTrigger value="upcoming">
          <Calendar className="w-4 h-4 mr-2" />
          À venir
        </TabsTrigger>
        <TabsTrigger value="past">
          <Calendar className="w-4 h-4 mr-2" />
          Passés
        </TabsTrigger>
        <TabsTrigger value="draft">
          <FileText className="w-4 h-4 mr-2" />
          Brouillons
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="mt-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader className="animate-spin h-8 w-8" />
          </div>
        ) : upcomingEvents.length > 0 ? (
          upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="text-center py-8">
            <p>Aucun événement à venir</p>
            <Button className="mt-4" asChild>
              <Link to="/organizer/events">Créer un événement</Link>
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="past" className="mt-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader className="animate-spin h-8 w-8" />
          </div>
        ) : pastEvents.length > 0 ? (
          pastEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="text-center py-8">
            <p>Aucun événement passé</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="draft" className="mt-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader className="animate-spin h-8 w-8" />
          </div>
        ) : draftEvents.length > 0 ? (
          draftEvents.map(event => (
            <DraftEventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="text-center py-8">
            <p>Aucun brouillon</p>
            <Button className="mt-4" asChild>
              <Link to="/organizer/events">Créer un événement</Link>
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default EventsTabs;
