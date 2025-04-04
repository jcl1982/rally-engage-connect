
import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DraftEventCardProps {
  event: {
    id: string;
    title: string;
  };
}

const DraftEventCard = ({ event }: DraftEventCardProps) => (
  <Card key={event.id} className="mb-4">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>Brouillon • Non publié</CardDescription>
        </div>
        <Badge variant="outline">Brouillon</Badge>
      </div>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="text-muted-foreground">
        Dernière modification: {format(new Date(), "dd MMMM yyyy", { locale: fr })}
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="mr-2" asChild>
        <Link to={`/organizer/events`}>
          Éditer
        </Link>
      </Button>
      <Button asChild>
        <Link to={`/organizer/events`}>
          Gérer
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default DraftEventCard;
