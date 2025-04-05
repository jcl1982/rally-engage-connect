import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Flag, Calendar, Users, Trophy, LayoutDashboard } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import EventCard from "@/components/events/EventCard";
import { upcomingEvents } from "@/data/eventsData";
import { useAuth } from "@/context/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?q=80&w=2070&auto=format&fit=crop')",
          backgroundPosition: "center center" 
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-background" />
      
      <div className="container relative z-20 pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/27367e6e-c746-4f09-b941-9fe5dcaa7b35.png" 
              alt="ASA Guadeloupe Logo" 
              className="h-32 w-32 animate-fade-in"
            />
          </div>
          <Badge 
            className="mb-6 gradient-orange-blue animate-fade-in"
            variant="outline"
          >
            Plateforme d'Engagement Rallye
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Prenez le Départ de Votre Prochain
            <span className="text-rally-orange"> Rallye</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Connectez-vous aux événements de rallye, inscrivez-vous facilement
            et suivez votre parcours en temps réel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-rally-orange hover:bg-rally-orange/90">
              <Link to="/events">Explorer les Rallyes</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/register">Créer un Compte</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card className="hover-scale border-t-4 border-t-rally-orange">
      <CardContent className="pt-6">
        <div className="mb-4 w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-accent/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Pourquoi Utiliser RallyConnect?</h2>
          <p className="text-muted-foreground">
            Notre plateforme simplifie l'engagement aux rallyes avec des outils puissants pour les pilotes et les organisateurs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Trophy className="w-6 h-6 text-rally-orange" />}
            title="Inscription Simplifiée"
            description="Inscrivez-vous aux rallyes en quelques clics, sans paperasse administrative complexe."
          />
          <FeatureCard 
            icon={<Clock className="w-6 h-6 text-rally-orange" />}
            title="Suivi en Temps Réel"
            description="Suivez votre progression et consultez les temps intermédiaires pendant l'événement."
          />
          <FeatureCard 
            icon={<MapPin className="w-6 h-6 text-rally-orange" />}
            title="Navigation Précise"
            description="Accédez aux détails des parcours et aux points de contrôle directement sur votre appareil."
          />
          <FeatureCard 
            icon={<Flag className="w-6 h-6 text-rally-orange" />}
            title="Résultats Instantanés"
            description="Consultez les classements et les résultats dès qu'ils sont disponibles."
          />
          <FeatureCard 
            icon={<Calendar className="w-6 h-6 text-rally-orange" />}
            title="Calendrier Personnalisé"
            description="Créez votre calendrier de compétition et recevez des rappels pour les événements à venir."
          />
          <FeatureCard 
            icon={<Users className="w-6 h-6 text-rally-orange" />}
            title="Communauté de Pilotes"
            description="Connectez-vous avec d'autres participants et partagez votre expérience dans la communauté."
          />
        </div>
      </div>
    </section>
  );
};

const OrganizerSection = () => {
  return (
    <section className="py-10 bg-rally-orange/10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Espace Organisateur</h2>
            <p className="text-muted-foreground mb-6">
              En tant qu'organisateur, vous avez accès à un espace dédié pour gérer vos événements, 
              suivre les inscriptions et configurer les détails de vos rallyes.
            </p>
            <div className="space-y-4 mb-6 md:mb-0">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-rally-orange" />
                </div>
                <div>
                  <h3 className="font-semibold">Gestion d'événements</h3>
                  <p className="text-sm text-muted-foreground">Créez et gérez facilement vos rallyes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-rally-orange" />
                </div>
                <div>
                  <h3 className="font-semibold">Suivi des participants</h3>
                  <p className="text-sm text-muted-foreground">Gérez les inscriptions et les participants</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <Button asChild size="lg" className="bg-asag-red hover:bg-asag-red/90">
              <Link to="/organizer">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Accéder à mon espace
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const UpcomingEventsSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Événements à Venir</h2>
            <p className="text-muted-foreground max-w-2xl">
              Découvrez les prochains rallyes et sécurisez votre place dès maintenant.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/events">Voir Tous les Événements</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CallToActionSection = () => {
  return (
    <section className="py-20 bg-rally-dark text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à Rejoindre la Communauté?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Créez votre compte dès aujourd'hui et prenez le départ de votre prochain rallye.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-rally-orange hover:bg-rally-orange/90">
              <Link to="/register">S'inscrire Maintenant</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white hover:bg-white/10">
              <Link to="/events">Explorer les Rallyes</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  const { user } = useAuth();
  const { isOrganizer, loading: roleLoading } = useUserRole();
  const [showOrganizerSection, setShowOrganizerSection] = useState(false);

  useEffect(() => {
    if (user && !roleLoading && isOrganizer()) {
      setShowOrganizerSection(true);
    } else {
      setShowOrganizerSection(false);
    }
  }, [user, roleLoading, isOrganizer]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        {showOrganizerSection && <OrganizerSection />}
        <FeaturesSection />
        <UpcomingEventsSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
