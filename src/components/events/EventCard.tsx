
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    date: string;
    location: string;
    distance: string;
    imageSrc: string;
    status: "upcoming" | "ongoing" | "completed" | "registration";
    participants: number;
    maxParticipants: number;
  };
  className?: string;
}

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
    <Badge variant="outline" className={cn("font-medium", config.className)}>
      {config.label}
    </Badge>
  );
};

const EventCard = ({ event, className }: EventCardProps) => {
  const { id, title, date, location, distance, imageSrc, status, participants, maxParticipants } = event;
  
  return (
    <Card className={cn("overflow-hidden hover-scale", className)}>
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <EventStatusBadge status={status} />
        </div>
      </div>
      
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold mb-3 line-clamp-1">{title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4 text-rally-orange" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4 text-rally-orange" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4 text-rally-orange" />
            <span>{distance}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-2 h-4 w-4 text-rally-orange" />
            <span>{participants}/{maxParticipants} participants</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between items-center">
        <Button asChild variant="outline" size="sm">
          <Link to={`/events/${id}`}>Détails</Link>
        </Button>
        
        <Button asChild className="bg-rally-orange hover:bg-rally-orange/90" size="sm">
          <Link to={`/events/${id}/register`}>S'inscrire</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
