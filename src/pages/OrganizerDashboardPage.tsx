import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, CalendarPlus, Settings, Car, FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";

const EventCard = ({ title, date, location, status, participants }) => (
  <Card className="mb-4">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{date} • {location}</CardDescription>
        </div>
        <Badge className={status === "À venir" ? "bg-blue-100 text-blue-800 border-blue-200" : 
                          status === "En cours" ? "bg-green-100 text-green-800 border-green-200" : 
                          "bg-gray-100 text-gray-800 border-gray-200"}>
          {status}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="flex items-center text-muted-foreground">
        <Users className="w-4 h-4 mr-2" />
        <span>{participants} participants</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="mr-2" asChild>
        <Link to="/organizer/events/1">Détails</Link>
      </Button>
      <Button asChild>
        <Link to="/organizer/events/1/manage">Gérer</Link>
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
              value="3"
              icon={<Calendar className="w-6 h-6 text-blue-600" />}
              className="bg-blue-50"
            />
            <StatCard
              title="Participants"
              value="87"
              icon={<Users className="w-6 h-6 text-green-600" />}
              className="bg-green-50"
            />
            <StatCard
              title="Véhicules enregistrés"
              value="42"
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
              <Card className="mb-4">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Slalom des Abymes</CardTitle>
                      <CardDescription>Brouillon • Non publié</CardDescription>
                    </div>
                    <Badge variant="outline">Brouillon</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-muted-foreground">
                    Dernière modification: 28 mars 2025
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="mr-2">
                    Éditer
                  </Button>
                  <Button>
                    Publier
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Inscriptions récentes</CardTitle>
                <CardDescription>Dernières inscriptions à vos événements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-full mr-3 flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">Marc Durand</p>
                        <p className="text-sm text-muted-foreground">Rallye des Grandes Îles</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">il y a 2h</p>
                  </div>
                ))}
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrganizerDashboardPage;
