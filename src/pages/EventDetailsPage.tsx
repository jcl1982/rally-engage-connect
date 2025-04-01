
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Route, Users, Trophy } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { upcomingEvents } from "@/data/eventsData";
import EventHeader from "@/components/events/EventHeader";
import EventSidebar from "@/components/events/EventSidebar";
import OverviewTab from "@/components/events/tabs/OverviewTab";
import RouteTab from "@/components/events/tabs/RouteTab";
import ParticipantsTab from "@/components/events/tabs/ParticipantsTab";
import ResultsTab from "@/components/events/tabs/ResultsTab";

const EventDetailsPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find the event in our data
  const event = upcomingEvents.find(e => e.id === id) || upcomingEvents[0];
  
  if (!event) {
    return <div>Événement non trouvé</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <EventHeader 
          title={event.title} 
          status={event.status} 
          imageSrc={event.imageSrc} 
        />
        
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" onValueChange={setActiveTab}>
                <TabsList className="mb-8">
                  <TabsTrigger value="overview" className="text-base">
                    <Info className="h-4 w-4 mr-1" />
                    Aperçu
                  </TabsTrigger>
                  <TabsTrigger value="route" className="text-base">
                    <Route className="h-4 w-4 mr-1" />
                    Parcours
                  </TabsTrigger>
                  <TabsTrigger value="participants" className="text-base">
                    <Users className="h-4 w-4 mr-1" />
                    Participants
                  </TabsTrigger>
                  <TabsTrigger value="results" className="text-base">
                    <Trophy className="h-4 w-4 mr-1" />
                    Résultats
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <OverviewTab event={event} />
                </TabsContent>
                
                <TabsContent value="route">
                  <RouteTab event={event} />
                </TabsContent>
                
                <TabsContent value="participants">
                  <ParticipantsTab event={event} />
                </TabsContent>
                
                <TabsContent value="results">
                  <ResultsTab event={event} />
                </TabsContent>
              </Tabs>
            </div>
            
            <EventSidebar event={event} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetailsPage;
