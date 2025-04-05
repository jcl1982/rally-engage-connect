
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DraftEventCardProps {
  title: string;
  lastModified: string;
}

const DraftEventCard = ({ title, lastModified }: DraftEventCardProps) => (
  <Card className="mb-4">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Brouillon • Non publié</CardDescription>
        </div>
        <Badge variant="outline">Brouillon</Badge>
      </div>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="text-muted-foreground">
        Dernière modification: {lastModified}
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="mr-2">
        Éditer
      </Button>
      <Button>
        Publier
      </Button>
    </CardFooter>
  </Card>
);

export default DraftEventCard;
