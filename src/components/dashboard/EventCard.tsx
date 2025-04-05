
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  status: string;
  participants: string;
}

const EventCard = ({ title, date, location, status, participants }: EventCardProps) => (
  <Card className="mb-4">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{date} • {location}</CardDescription>
        </div>
        <Badge className={status === "À venir" ? "bg-blue-100 text-blue-800 border-blue-200" : 
                          status === "En cours" ? "bg-green-100 text-green-800 border-green-200" : 
                          "bg-gray-100 text-gray-800 border-gray-200"}>
          {status}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="flex items-center text-muted-foreground">
        <Users className="w-4 h-4 mr-2" />
        <span>{participants} participants</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="mr-2" asChild>
        <Link to="/organizer/events/1">Détails</Link>
      </Button>
      <Button asChild>
        <Link to="/organizer/events/1/manage">Gérer</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default EventCard;
