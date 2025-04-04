
import React from "react";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventManagementHeaderProps {
  onCreateEvent: () => void;
}

const EventManagementHeader = ({ onCreateEvent }: EventManagementHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des événements</h1>
        <p className="text-muted-foreground">
          Créez et gérez vos événements de rallye
        </p>
      </div>
      <Button className="mt-4 md:mt-0 bg-asag-red hover:bg-asag-red/90" onClick={onCreateEvent}>
        <CalendarPlus className="mr-2 h-4 w-4" />
        Créer un événement
      </Button>
    </div>
  );
};

export default EventManagementHeader;
