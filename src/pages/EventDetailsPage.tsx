
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Users, Phone, Mail, Flag, Trophy, Heart, Share2, Car, Route, Info } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { upcomingEvents } from "@/data/eventsData";

const EventStatusBadge = ({ status }) => {
  const statusConfig = {
    upcoming: {
      label: "À venir",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    ongoing: {
      label: "En cours",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    completed: {
      label: "Terminé",
      className: "bg-gray-100 text-gray-800 border-gray-200",
    },
    registration: {
      label: "Inscriptions ouvertes",
      className: "bg-rally-orange/20 text-rally-orange border-rally-orange/30",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

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
        <div 
          className="h-64 md:h-96 relative flex items-end"
          style={{
            backgroundImage: `url(${event.imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-rally-dark/80 to-transparent" />
          <div className="container relative z-10 pb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <EventStatusBadge status={event.status} />
                <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{event.title}</h1>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                  <Heart className="h-4 w-4 mr-1" />
                  <span>Favoris</span>
                </Button>
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                  <Share2 className="h-4 w-4 mr-1" />
                  <span>Partager</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
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
                
                <TabsContent value="overview" className="space-y-8">
                  <div className="p-6 bg-card rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">À propos de l'événement</h2>
                    <p className="text-muted-foreground mb-6">
                      Le {event.title} est un rallye emblématique qui se déroule dans la magnifique région de {event.location}. 
                      Ce rallye propose un parcours exigeant à travers des paysages spectaculaires, combinant sections 
                      techniques et portions rapides pour tester les compétences des pilotes.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      L'événement accueille aussi bien les pilotes amateurs que professionnels, avec différentes catégories 
                      pour tous les niveaux. Ne manquez pas cette opportunité de participer à l'un des rallyes les plus 
                      appréciés de la saison.
                    </p>
                    <h3 className="text-lg font-medium mb-3">Points forts :</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Plus de {event.distance} de parcours</li>
                      <li>Passage par des sites historiques et points de vue exceptionnels</li>
                      <li>Assistance technique disponible tout au long du parcours</li>
                      <li>Cérémonie de remise des prix et dîner de gala</li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-card rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Catégories</h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-accent rounded-md border">
                        <h3 className="font-medium mb-1">Catégorie Pro</h3>
                        <p className="text-sm text-muted-foreground">Pour les pilotes expérimentés avec véhicules homologués FIA.</p>
                      </div>
                      <div className="p-4 bg-accent rounded-md border">
                        <h3 className="font-medium mb-1">Catégorie Amateur</h3>
                        <p className="text-sm text-muted-foreground">Pour les pilotes amateurs avec véhicules modifiés.</p>
                      </div>
                      <div className="p-4 bg-accent rounded-md border">
                        <h3 className="font-medium mb-1">Catégorie Classique</h3>
                        <p className="text-sm text-muted-foreground">Pour les véhicules historiques de plus de 30 ans.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="route" className="space-y-8">
                  <div className="p-6 bg-card rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Parcours du Rallye</h2>
                    <p className="text-muted-foreground mb-6">
                      Le parcours total s'étend sur {event.distance} et comprend diverses sections
                      à travers des terrains variés.
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="border-l-4 border-rally-orange pl-4 py-2">
                        <h3 className="font-medium">Étape 1: Départ à Montagne</h3>
                        <p className="text-sm text-muted-foreground">45 km - Routes sinueuses en montagne</p>
                      </div>
                      <div className="border-l-4 border-rally-blue pl-4 py-2">
                        <h3 className="font-medium">Étape 2: Col de la Traverse</h3>
                        <p className="text-sm text-muted-foreground">60 km - Passages techniques et dénivelé important</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4 py-2">
                        <h3 className="font-medium">Étape 3: Plaine des Alpilles</h3>
                        <p className="text-sm text-muted-foreground">35 km - Section rapide sur routes ouvertes</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4 py-2">
                        <h3 className="font-medium">Étape 4: Retour vers Arrivée</h3>
                        <p className="text-sm text-muted-foreground">50 km - Mixte avec passage en forêt</p>
                      </div>
                    </div>
                    
                    <div className="aspect-[16/9] bg-gray-200 rounded-md flex items-center justify-center mb-4">
                      <div className="text-center p-4">
                        <MapPin className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">Carte du parcours</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">Télécharger le roadbook</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="participants" className="space-y-8">
                  <div className="p-6 bg-card rounded-lg border">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Participants inscrits</h2>
                      <p className="text-sm text-muted-foreground">{event.participants}/{event.maxParticipants} inscrits</p>
                    </div>
                    
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <div key={i} className="flex items-center p-3 border rounded-md">
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <Car className="w-6 h-6 text-gray-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Pilote {i + 1}</h4>
                            <p className="text-sm text-muted-foreground">Véhicule: Alpine A110 • Catégorie: Amateur</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button variant="outline">Voir tous les participants</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="results" className="space-y-8">
                  <div className="p-6 bg-card rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Résultats</h2>
                    {event.status === "completed" ? (
                      <div className="space-y-4">
                        <div className="p-4 border rounded-md flex items-center">
                          <div className="w-10 h-10 rounded-full bg-rally-orange flex items-center justify-center text-white font-bold mr-3">
                            1
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">Jean Dupont</h4>
                            <p className="text-sm text-muted-foreground">Temps: 2h 34m 12s</p>
                          </div>
                          <Trophy className="w-5 h-5 text-rally-orange" />
                        </div>
                        <div className="p-4 border rounded-md flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold mr-3">
                            2
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">Marie Martin</h4>
                            <p className="text-sm text-muted-foreground">Temps: 2h 36m 45s</p>
                          </div>
                        </div>
                        <div className="p-4 border rounded-md flex items-center">
                          <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold mr-3">
                            3
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">Pierre Leclerc</h4>
                            <p className="text-sm text-muted-foreground">Temps: 2h 38m 21s</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">Les résultats seront disponibles après l'événement</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 bg-card rounded-lg border">
                  <h2 className="text-xl font-semibold mb-4">Informations</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-rally-orange mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{event.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-rally-orange mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Lieu</p>
                        <p className="font-medium">{event.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-rally-orange mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Distance</p>
                        <p className="font-medium">{event.distance}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-rally-orange mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Participants</p>
                        <p className="font-medium">{event.participants}/{event.maxParticipants}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Flag className="w-5 h-5 text-rally-orange mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Types</p>
                        <p className="font-medium">Asphalte, Montagne</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-card rounded-lg border">
                  <h2 className="text-xl font-semibold mb-4">Organisateur</h2>
                  
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Trophy className="w-10 h-10 text-gray-500" />
                      </div>
                      <h3 className="font-medium">Club Automobile de Provence</h3>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-rally-orange mr-3" />
                      <p className="text-sm">+33 4 91 XX XX XX</p>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-rally-orange mr-3" />
                      <p className="text-sm">contact@rallyeprovence.fr</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-rally-orange hover:bg-rally-orange/90" size="lg" asChild>
                  <Link to={`/events/${id}/register`}>S'inscrire</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetailsPage;
