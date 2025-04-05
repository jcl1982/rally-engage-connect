
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText } from "lucide-react";
import EventCard from "./EventCard";
import DraftEventCard from "./DraftEventCard";

const EventTabs = () => (
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
      <EventCard
        title="Rallye des Grandes Îles"
        date="15-17 mai 2025"
        location="Guadeloupe"
        status="À venir"
        participants="32"
      />
      <EventCard
        title="Course de côte de Capesterre"
        date="20-22 juin 2025"
        location="Basse-Terre"
        status="À venir"
        participants="28"
      />
    </TabsContent>

    <TabsContent value="past" className="mt-6">
      <EventCard
        title="Rallye de Marie-Galante"
        date="10-12 février 2025"
        location="Marie-Galante"
        status="Terminé"
        participants="27"
      />
    </TabsContent>

    <TabsContent value="draft" className="mt-6">
      <DraftEventCard 
        title="Slalom des Abymes" 
        lastModified="28 mars 2025" 
      />
    </TabsContent>
  </Tabs>
);

export default EventTabs;
