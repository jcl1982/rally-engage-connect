
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, CalendarPlus, Settings, Car, FileText, ChevronRight, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Type pour les événements
type Event = {
  id: string;
  title: string;
  location: string;
  start_date: string;
  end_date: string;
  status: string;
  participants?: number;
};

const EventCard = ({ event }: { event: Event }) => (
  <Card className="mb-4">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>
            {format(new Date(event.start_date), "dd MMMM yyyy", { locale: fr })} - {format(new Date(event.end_date), "dd MMMM yyyy", { locale: fr })} • {event.location}
          </CardDescription>
        </div>
        <Badge className={event.status === "published" ? "bg-blue-100 text-blue-800 border-blue-200" : 
                          event.status === "draft" ? "bg-gray-100 text-gray-800 border-gray-200" : 
                          "bg-red-100 text-red-800 border-red-200"}>
          {event.status === "published" ? "Publié" : event.status === "draft" ? "Brouillon" : "Annulé"}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="flex items-center text-muted-foreground">
        <Users className="w-4 h-4 mr-2" />
        <span>{event.participants || 0} participants</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="mr-2" asChild>
        <Link to={`/events/${event.id}`}>Détails</Link>
      </Button>
      <Button asChild>
        <Link to={`/organizer/events`}>Gérer</Link>
      </Button>
    </CardFooter>
  </Card>
);

const StatCard = ({ title, value, icon, className }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${className}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const OrganizerDashboardPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    eventsCount: 0,
    participantsCount: 0,
    vehiclesCount: 0
  });

  // Charger les événements de l'organisateur
  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        // Récupérer les événements de l'organisateur
        const { data: eventsData, error: eventsError } = await supabase
          .from("events" as any)
          .select("*")
          .eq("organizer_id", user.id)
          .order("start_date", { ascending: true });
        
        if (eventsError) throw eventsError;
        
        const typedEvents = eventsData as unknown as Event[];
        setEvents(typedEvents);

        // Calculer les statistiques
        setStats({
          eventsCount: typedEvents.length,
          participantsCount: 87, // À remplacer par une vraie requête quand la table des participants sera créée
          vehiclesCount: 42 // À remplacer par une vraie requête quand la table des véhicules sera créée
        });
      } catch (error: any) {
        console.error("Erreur lors du chargement des événements:", error.message);
        toast.error("Impossible de charger vos événements");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user]);

  // Filtrer les événements par statut
  const upcomingEvents = events.filter(e => e.status === "published" && new Date(e.end_date) >= new Date());
  const pastEvents = events.filter(e => e.status === "published" && new Date(e.end_date) < new Date());
  const draftEvents = events.filter(e => e.status === "draft");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Espace Organisateur</h1>
              <p className="text-muted-foreground">
                Gérez vos événements et suivez les participants
              </p>
            </div>
            <Button className="mt-4 md:mt-0 bg-asag-red hover:bg-asag-red/90" asChild>
              <Link to="/organizer/events">
                <CalendarPlus className="mr-2 h-4 w-4" />
                Gérer les événements
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Événements"
              value={stats.eventsCount}
              icon={<Calendar className="w-6 h-6 text-blue-600" />}
              className="bg-blue-50"
            />
            <StatCard
              title="Participants"
              value={stats.participantsCount}
              icon={<Users className="w-6 h-6 text-green-600" />}
              className="bg-green-50"
            />
            <StatCard
              title="Véhicules enregistrés"
              value={stats.vehiclesCount}
              icon={<Car className="w-6 h-6 text-orange-600" />}
              className="bg-orange-50"
            />
          </div>

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
                  <Card key={event.id} className="mb-4">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{event.title}</CardTitle>
                          <CardDescription>Brouillon • Non publié</CardDescription>
                        </div>
                        <Badge variant="outline">Brouillon</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-muted-foreground">
                        Dernière modification: {format(new Date(), "dd MMMM yyyy", { locale: fr })}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="mr-2" asChild>
                        <Link to={`/organizer/events`}>
                          Éditer
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link to={`/organizer/events`}>
                          Gérer
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
                <CardDescription>Gérer votre espace organisateur</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/organizer/events">
                    <Calendar className="mr-2 h-4 w-4" />
                    Gérer les événements
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/organizer/participants">
                    <Users className="mr-2 h-4 w-4" />
                    Gérer les participants
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/organizer/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inscriptions récentes</CardTitle>
                <CardDescription>Dernières inscriptions à vos événements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-4">
                    <Loader className="animate-spin h-6 w-6" />
                  </div>
                ) : (
                  [1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full mr-3 flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">Marc Durand</p>
                          <p className="text-sm text-muted-foreground">
                            {events[0]?.title || "Rallye"}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">il y a 2h</p>
                    </div>
                  ))
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/organizer/registrations">
                    Voir toutes les inscriptions
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrganizerDashboardPage;
