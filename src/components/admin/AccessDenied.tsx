
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

const AccessDenied: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md shadow-lg border-destructive/50">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl text-destructive">
            Accès refusé
          </CardTitle>
          <CardDescription>
            Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Cette page est réservée aux administrateurs. Si vous pensez que c'est une erreur,
            veuillez contacter un administrateur pour vérifier vos droits d'accès.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <a href="/">Retour à l'accueil</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/login">Se connecter avec un autre compte</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessDenied;
