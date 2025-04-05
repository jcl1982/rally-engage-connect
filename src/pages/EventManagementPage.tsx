
import React, { useState } from "react";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventFormDialog from "@/components/events/EventFormDialog";
import DeleteEventDialog from "@/components/events/DeleteEventDialog";
import OrganizerEventList from "@/components/events/OrganizerEventList";
import { useEventManagement } from "@/hooks/useEventManagement";

const EventManagementPage = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const {
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
  } = useEventManagement();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gestion des événements</h1>
              <p className="text-muted-foreground">
                Créez et gérez vos événements de rallye
              </p>
            </div>
            <Button className="mt-4 md:mt-0 bg-asag-red hover:bg-asag-red/90" onClick={handleCreateEvent}>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Créer un événement
            </Button>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="draft">Brouillons</TabsTrigger>
              <TabsTrigger value="published">Publiés</TabsTrigger>
              <TabsTrigger value="cancelled">Annulés</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <OrganizerEventList 
                events={events}
                loading={loading}
                onCreateEvent={handleCreateEvent}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
                activeTab={activeTab}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

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
    </div>
  );
};

export default EventManagementPage;
