
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { CalendarPlus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import EventFormDialog from "@/components/events/EventFormDialog";
import DeleteEventDialog from "@/components/events/DeleteEventDialog";
import { toast } from "sonner";
import { Link } from "react-router-dom";

type Event = {
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

const EventManagementPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    fetchEvents();
  }, [user]);

  const fetchEvents = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("events" as any)
        .select("*")
        .order("start_date", { ascending: true });

      if (error) throw error;
      setEvents(data as Event[]);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des événements:", error.message);
      toast.error("Impossible de charger les événements.");
    } finally {
      setLoading(false);
    }
  };

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Brouillon</Badge>;
      case "published":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Publié</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Annulé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredEvents = activeTab === "all" 
    ? events 
    : events.filter(event => event.status === activeTab);

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
              {loading ? (
                <div className="text-center py-8">
                  <p>Chargement des événements...</p>
                </div>
              ) : filteredEvents.length === 0 ? (
                <div className="text-center py-8">
                  <p>Aucun événement trouvé.</p>
                  <Button className="mt-4" variant="outline" onClick={handleCreateEvent}>
                    Créer votre premier événement
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredEvents.map((event) => (
                    <Card key={event.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription>
                              {format(new Date(event.start_date), "dd MMMM yyyy", { locale: fr })}
                              {" - "}
                              {format(new Date(event.end_date), "dd MMMM yyyy", { locale: fr })} 
                              {" • "} 
                              {event.location}
                            </CardDescription>
                          </div>
                          {getStatusBadge(event.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {event.description || "Aucune description"}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/events/${event.id}`}>
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Link>
                        </Button>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditEvent(event)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Modifier
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteEvent(event)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Supprimer
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
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
