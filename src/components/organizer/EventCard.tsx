
import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface EventCardProps {
  event: {
    id: string;
    title: string;
    location: string;
    start_date: string;
    end_date: string;
    status: string;
    participants?: number;
  };
}

const EventCard = ({ event }: EventCardProps) => (
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
        <div className="flex items-center">
          <span>{event.participants || 0} participants</span>
        </div>
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

export default EventCard;
