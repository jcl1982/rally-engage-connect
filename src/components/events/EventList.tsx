
import React from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/hooks/useEventManagement";

interface EventListProps {
  events: Event[];
  loading: boolean;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (event: Event) => void;
}

const EventList = ({ events, loading, onEditEvent, onDeleteEvent }: EventListProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Brouillon</Badge>;
      case "published":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Publié</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Annulé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Chargement des événements...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Aucun événement trouvé.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>
                  {format(new Date(event.start_date), "dd MMMM yyyy", { locale: fr })}
                  {" - "}
                  {format(new Date(event.end_date), "dd MMMM yyyy", { locale: fr })} 
                  {" • "} 
                  {event.location}
                </CardDescription>
              </div>
              {getStatusBadge(event.status)}
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {event.description || "Aucune description"}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/events/${event.id}`}>
                <Eye className="w-4 h-4 mr-1" />
                Voir
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEditEvent(event)}
              >
                <Edit className="w-4 h-4 mr-1" />
                Modifier
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-red-500 hover:text-red-700"
                onClick={() => onDeleteEvent(event)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Supprimer
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default EventList;
