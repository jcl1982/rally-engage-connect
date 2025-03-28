
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventCard from "@/components/events/EventCard";
import { upcomingEvents } from "@/data/eventsData";

const EventFilters = () => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border">
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <Filter className="w-5 h-5" />
        Filtres
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Statut</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="registration">Inscriptions ouvertes</SelectItem>
              <SelectItem value="upcoming">À venir</SelectItem>
              <SelectItem value="ongoing">En cours</SelectItem>
              <SelectItem value="completed">Terminés</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Région</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Toutes les régions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les régions</SelectItem>
              <SelectItem value="bretagne">Bretagne</SelectItem>
              <SelectItem value="provence">Provence-Alpes-Côte d'Azur</SelectItem>
              <SelectItem value="alsace">Grand Est</SelectItem>
              <SelectItem value="rhonealpes">Auvergne-Rhône-Alpes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Date</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Toutes les dates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les dates</SelectItem>
              <SelectItem value="thisMonth">Ce mois-ci</SelectItem>
              <SelectItem value="nextMonth">Mois prochain</SelectItem>
              <SelectItem value="thisYear">Cette année</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Distance</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Toutes les distances" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les distances</SelectItem>
              <SelectItem value="short">Court (< 100km)</SelectItem>
              <SelectItem value="medium">Moyen (100-200km)</SelectItem>
              <SelectItem value="long">Long (> 200km)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="w-full bg-rally-orange hover:bg-rally-orange/90">
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
};

const EventsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search through events
    console.log("Searching for:", searchQuery);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-accent/50 py-16">
          <div className="container">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Rallyes & Événements</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez les événements de rallye à venir et inscrivez-vous directement
                en ligne pour sécuriser votre place.
              </p>
            </div>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher un événement..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" className="bg-rally-orange hover:bg-rally-orange/90">
                  Rechercher
                </Button>
              </div>
            </form>
            
            <div className="flex justify-center space-x-2 mb-8">
              <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-accent">
                Tous
              </Badge>
              <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-accent bg-rally-orange/20 text-rally-orange">
                Inscriptions ouvertes
              </Badge>
              <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-accent">
                À venir
              </Badge>
              <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-accent">
                Terminés
              </Badge>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 hidden lg:block">
                <div className="sticky top-24">
                  <EventFilters />
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">23 événements trouvés</h2>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-1" />
                      Filtres
                    </Button>
                    
                    <Select defaultValue="newest">
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Trier par" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Date (Récent)</SelectItem>
                        <SelectItem value="oldest">Date (Ancien)</SelectItem>
                        <SelectItem value="popular">Popularité</SelectItem>
                        <SelectItem value="distance">Distance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
                
                <div className="mt-12 text-center">
                  <Button variant="outline">Charger Plus</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
