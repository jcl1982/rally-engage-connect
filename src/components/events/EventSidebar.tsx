
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Phone, Mail, Flag, Trophy } from "lucide-react";

interface EventSidebarProps {
  event: {
    id: string;
    date: string;
    location: string;
    distance: string;
    participants: number;
    maxParticipants: number;
  };
}

const EventSidebar: React.FC<EventSidebarProps> = ({ event }) => {
  return (
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
          <Link to={`/events/${event.id}/register`}>S'inscrire</Link>
        </Button>
      </div>
    </div>
  );
};

export default EventSidebar;
