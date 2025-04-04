
import React from "react";
import { Link } from "react-router-dom";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => (
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
);

export default DashboardHeader;
