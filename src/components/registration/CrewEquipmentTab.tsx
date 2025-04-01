
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { HardHat, Shield } from "lucide-react";

const CrewEquipmentTab = () => {
  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <HardHat className="h-5 w-5 text-rally-orange" />
          Équipement du Pilote
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="driver-helmet">Casque</Label>
            <Input id="driver-helmet" placeholder="Marque et modèle" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="driver-helmet-homologation">N° Homologation</Label>
            <Input id="driver-helmet-homologation" placeholder="N° d'homologation du casque" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="driver-suit">Combinaison</Label>
            <Input id="driver-suit" placeholder="Marque et modèle" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="driver-suit-homologation">N° Homologation</Label>
            <Input id="driver-suit-homologation" placeholder="N° d'homologation de la combinaison" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="driver-gloves">Gants</Label>
            <Input id="driver-gloves" placeholder="Marque et modèle" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="driver-gloves-homologation">N° Homologation</Label>
            <Input id="driver-gloves-homologation" placeholder="N° d'homologation des gants" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="driver-boots">Bottines</Label>
            <Input id="driver-boots" placeholder="Marque et modèle" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="driver-boots-homologation">N° Homologation</Label>
            <Input id="driver-boots-homologation" placeholder="N° d'homologation des bottines" />
          </div>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5 text-rally-orange" />
          Équipement du Copilote
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="codriver-helmet">Casque</Label>
            <Input id="codriver-helmet" placeholder="Marque et modèle" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="codriver-helmet-homologation">N° Homologation</Label>
            <Input id="codriver-helmet-homologation" placeholder="N° d'homologation du casque" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="codriver-suit">Combinaison</Label>
            <Input id="codriver-suit" placeholder="Marque et modèle" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="codriver-suit-homologation">N° Homologation</Label>
            <Input id="codriver-suit-homologation" placeholder="N° d'homologation de la combinaison" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="codriver-gloves">Gants</Label>
            <Input id="codriver-gloves" placeholder="Marque et modèle" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="codriver-gloves-homologation">N° Homologation</Label>
            <Input id="codriver-gloves-homologation" placeholder="N° d'homologation des gants" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="codriver-boots">Bottines</Label>
            <Input id="codriver-boots" placeholder="Marque et modèle" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="codriver-boots-homologation">N° Homologation</Label>
            <Input id="codriver-boots-homologation" placeholder="N° d'homologation des bottines" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewEquipmentTab;
