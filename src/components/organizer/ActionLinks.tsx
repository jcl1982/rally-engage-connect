
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, Settings } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ActionLinks = () => (
  <Card>
    <CardHeader>
      <CardTitle>Actions rapides</CardTitle>
      <CardDescription>Gérer votre espace organisateur</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      <Button variant="outline" className="w-full justify-start" asChild>
        <Link to="/organizer/events">
          <Calendar className="mr-2 h-4 w-4" />
          Gérer les événements
        </Link>
      </Button>
      <Button variant="outline" className="w-full justify-start" asChild>
        <Link to="/organizer/participants">
          <Users className="mr-2 h-4 w-4" />
          Gérer les participants
        </Link>
      </Button>
      <Button variant="outline" className="w-full justify-start" asChild>
        <Link to="/organizer/settings">
          <Settings className="mr-2 h-4 w-4" />
          Paramètres
        </Link>
      </Button>
    </CardContent>
  </Card>
);

export default ActionLinks;
