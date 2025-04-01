
import React from "react";
import { Trophy } from "lucide-react";

interface ResultsTabProps {
  event: {
    status: string;
  };
}

const ResultsTab: React.FC<ResultsTabProps> = ({ event }) => {
  return (
    <div className="space-y-8">
      <div className="p-6 bg-card rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Résultats</h2>
        {event.status === "completed" ? (
          <div className="space-y-4">
            <div className="p-4 border rounded-md flex items-center">
              <div className="w-10 h-10 rounded-full bg-rally-orange flex items-center justify-center text-white font-bold mr-3">
                1
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">Jean Dupont</h4>
                <p className="text-sm text-muted-foreground">Temps: 2h 34m 12s</p>
              </div>
              <Trophy className="w-5 h-5 text-rally-orange" />
            </div>
            <div className="p-4 border rounded-md flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold mr-3">
                2
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">Marie Martin</h4>
                <p className="text-sm text-muted-foreground">Temps: 2h 36m 45s</p>
              </div>
            </div>
            <div className="p-4 border rounded-md flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold mr-3">
                3
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">Pierre Leclerc</h4>
                <p className="text-sm text-muted-foreground">Temps: 2h 38m 21s</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Les résultats seront disponibles après l'événement</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsTab;
