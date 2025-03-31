
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";

export const SafetyEquipmentSection = () => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="text-rally-orange w-5 h-5" />
        <h3 className="font-medium">Équipements de sécurité obligatoires</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="rollcage" />
            <Label htmlFor="rollcage" className="text-sm font-normal">
              Arceau de sécurité homologué
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="harness" />
            <Label htmlFor="harness" className="text-sm font-normal">
              Harnais de sécurité 6 points
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="seats" />
            <Label htmlFor="seats" className="text-sm font-normal">
              Sièges baquets homologués FIA
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="extinguisher" />
            <Label htmlFor="extinguisher" className="text-sm font-normal">
              Extincteur manuel (min. 2kg)
            </Label>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="helmets" />
            <Label htmlFor="helmets" className="text-sm font-normal">
              Casques homologués FIA
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="hans" />
            <Label htmlFor="hans" className="text-sm font-normal">
              Système HANS / FHR
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="fireproof" />
            <Label htmlFor="fireproof" className="text-sm font-normal">
              Combinaisons ignifugées FIA
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="cutoff" />
            <Label htmlFor="cutoff" className="text-sm font-normal">
              Coupe-circuit électrique
            </Label>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="text-rally-orange w-5 h-5" />
          <h3 className="font-medium">Équipements de secours</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="firstaid" />
              <Label htmlFor="firstaid" className="text-sm font-normal">
                Trousse de premiers secours
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="triangle" />
              <Label htmlFor="triangle" className="text-sm font-normal">
                Triangle de signalisation
              </Label>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="towing" />
              <Label htmlFor="towing" className="text-sm font-normal">
                Anneau de remorquage
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="reflective" />
              <Label htmlFor="reflective" className="text-sm font-normal">
                Gilets réfléchissants
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
