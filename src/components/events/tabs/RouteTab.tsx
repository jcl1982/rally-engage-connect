
import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface RouteTabProps {
  event: {
    distance: string;
  };
}

const RouteTab: React.FC<RouteTabProps> = ({ event }) => {
  return (
    <div className="space-y-8">
      <div className="p-6 bg-card rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Parcours du Rallye</h2>
        <p className="text-muted-foreground mb-6">
          Le parcours total s'étend sur {event.distance} et comprend diverses sections
          à travers des terrains variés.
        </p>
        
        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-rally-orange pl-4 py-2">
            <h3 className="font-medium">Étape 1: Départ à Montagne</h3>
            <p className="text-sm text-muted-foreground">45 km - Routes sinueuses en montagne</p>
          </div>
          <div className="border-l-4 border-rally-blue pl-4 py-2">
            <h3 className="font-medium">Étape 2: Col de la Traverse</h3>
            <p className="text-sm text-muted-foreground">60 km - Passages techniques et dénivelé important</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h3 className="font-medium">Étape 3: Plaine des Alpilles</h3>
            <p className="text-sm text-muted-foreground">35 km - Section rapide sur routes ouvertes</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h3 className="font-medium">Étape 4: Retour vers Arrivée</h3>
            <p className="text-sm text-muted-foreground">50 km - Mixte avec passage en forêt</p>
          </div>
        </div>
        
        <div className="aspect-[16/9] bg-gray-200 rounded-md flex items-center justify-center mb-4">
          <div className="text-center p-4">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">Carte du parcours</p>
          </div>
        </div>
        
        <Button variant="outline" className="w-full">Télécharger le roadbook</Button>
      </div>
    </div>
  );
};

export default RouteTab;
