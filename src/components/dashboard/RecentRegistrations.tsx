
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

const RecentRegistrations = () => (
  <Card>
    <CardHeader>
      <CardTitle>Inscriptions récentes</CardTitle>
      <CardDescription>Dernières inscriptions à vos événements</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full mr-3 flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <p className="font-medium">Marc Durand</p>
              <p className="text-sm text-muted-foreground">Rallye des Grandes Îles</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">il y a 2h</p>
        </div>
      ))}
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full" asChild>
        <Link to="/organizer/registrations">
          Voir toutes les inscriptions
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default RecentRegistrations;
