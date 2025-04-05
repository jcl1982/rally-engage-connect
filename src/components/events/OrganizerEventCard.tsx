
import React from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";

export type EventCardProps = {
  event: {
    id: string;
    title: string;
    description: string | null;
    location: string;
    start_date: string;
    end_date: string;
    status: string;
    image_url: string | null;
  };
  onEdit: (event: EventCardProps['event']) => void;
  onDelete: (event: EventCardProps['event']) => void;
};

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

const OrganizerEventCard = ({ event, onEdit, onDelete }: EventCardProps) => {
  return (
    <Card>
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
            onClick={() => onEdit(event)}
          >
            <Edit className="w-4 h-4 mr-1" />
            Modifier
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(event)}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Supprimer
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrganizerEventCard;
