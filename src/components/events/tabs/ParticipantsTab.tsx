
import React from "react";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

interface ParticipantsTabProps {
  event: {
    participants: number;
    maxParticipants: number;
  };
}

const ParticipantsTab: React.FC<ParticipantsTabProps> = ({ event }) => {
  return (
    <div className="space-y-8">
      <div className="p-6 bg-card rounded-lg border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Participants inscrits</h2>
          <p className="text-sm text-muted-foreground">{event.participants}/{event.maxParticipants} inscrits</p>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div key={i} className="flex items-center p-3 border rounded-md">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <Car className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h4 className="font-medium">Pilote {i + 1}</h4>
                <p className="text-sm text-muted-foreground">Véhicule: Alpine A110 • Catégorie: Amateur</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline">Voir tous les participants</Button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsTab;
