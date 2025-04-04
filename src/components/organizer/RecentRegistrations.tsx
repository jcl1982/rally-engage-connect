
import React from "react";
import { Users, Loader, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RecentRegistrationsProps {
  loading: boolean;
  eventTitle?: string;
}

const RecentRegistrations = ({ loading, eventTitle }: RecentRegistrationsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Inscriptions récentes</CardTitle>
      <CardDescription>Dernières inscriptions à vos événements</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {loading ? (
        <div className="flex justify-center py-4">
          <Loader className="animate-spin h-6 w-6" />
        </div>
      ) : (
        [1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full mr-3 flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">Marc Durand</p>
                <p className="text-sm text-muted-foreground">
                  {eventTitle || "Rallye"}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">il y a 2h</p>
          </div>
        ))
      )}
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
