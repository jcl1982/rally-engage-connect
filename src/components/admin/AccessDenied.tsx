
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AccessDenied: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-red-500">
            Accès refusé
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">
            Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <a href="/">Retour à l'accueil</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessDenied;
