
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users, CalendarPlus, Car } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";

// Import refactored components
import StatCard from "@/components/dashboard/StatCard";
import EventTabs from "@/components/dashboard/EventTabs";
import RecentRegistrations from "@/components/dashboard/RecentRegistrations";
import QuickActions from "@/components/dashboard/QuickActions";

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

          <EventTabs />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RecentRegistrations />
            <QuickActions />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrganizerDashboardPage;
