
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, BadgeAlert, CarFront, Helmet } from "lucide-react";
import { SafetyEquipmentSection } from "./SafetyEquipmentSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CrewEquipmentTab from "./CrewEquipmentTab";

const VehicleInfoStep = () => {
  return (
    <>
      <CardHeader>
        <CardTitle>Informations du véhicule</CardTitle>
        <CardDescription>
          Veuillez saisir les détails de votre véhicule et confirmer les équipements de sécurité
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="vehicle" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vehicle" className="flex items-center gap-2">
              <CarFront className="h-4 w-4" />
              <span className="hidden sm:inline">Véhicule</span>
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Équipements Véhicule</span>
            </TabsTrigger>
            <TabsTrigger value="crew" className="flex items-center gap-2">
              <Helmet className="h-4 w-4" />
              <span className="hidden sm:inline">Équipements Équipage</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="vehicle" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="make">Marque</Label>
                <Input id="make" placeholder="Ex: Renault, Peugeot, Alpine..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Modèle</Label>
                <Input id="model" placeholder="Ex: Clio, 208, A110..." />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-2">
                <Label htmlFor="year">Année</Label>
                <Input id="year" placeholder="Ex: 2020" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registration">Immatriculation</Label>
                <Input id="registration" placeholder="Ex: AB-123-CD" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-2">
                <Label htmlFor="group">Groupe</Label>
                <Select defaultValue="a">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le groupe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Groupe A (Voitures de tourisme)</SelectItem>
                    <SelectItem value="n">Groupe N (Voitures de production)</SelectItem>
                    <SelectItem value="r">Groupe R (Voitures de rallye)</SelectItem>
                    <SelectItem value="gt">Groupe GT (Grand Tourisme)</SelectItem>
                    <SelectItem value="f">Groupe F (Formule libre)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Classe</Label>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Classe 1 (jusqu'à 1400cc)</SelectItem>
                    <SelectItem value="2">Classe 2 (1401-1600cc)</SelectItem>
                    <SelectItem value="3">Classe 3 (1601-2000cc)</SelectItem>
                    <SelectItem value="4">Classe 4 (2001-2500cc)</SelectItem>
                    <SelectItem value="5">Classe 5 (2501cc et plus)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <Label htmlFor="category">Catégorie</Label>
              <Select defaultValue="amateur">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez la catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pro">Catégorie Pro</SelectItem>
                  <SelectItem value="amateur">Catégorie Amateur</SelectItem>
                  <SelectItem value="classic">Catégorie Classique</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 mt-4">
              <Label htmlFor="power">Puissance (ch)</Label>
              <Input id="power" placeholder="Ex: 180" type="number" />
            </div>
            
            <div className="space-y-2 mt-4">
              <Label htmlFor="modifications">Modifications / Préparations</Label>
              <Input id="modifications" placeholder="Décrivez les modifications apportées" />
            </div>
          </TabsContent>
          
          <TabsContent value="safety">
            <SafetyEquipmentSection />
          </TabsContent>
          
          <TabsContent value="crew">
            <CrewEquipmentTab />
          </TabsContent>
        </Tabs>
        
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
          <div className="flex items-start gap-2">
            <BadgeAlert className="text-amber-600 w-5 h-5 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium mb-1">Important</p>
              <p className="text-sm text-amber-700">
                Tous les équipements de sécurité seront vérifiés lors du contrôle technique avant le départ.
                Tout manquement aux exigences de sécurité entraînera une disqualification.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="technical" />
          <Label htmlFor="technical" className="text-sm font-normal">
            Je confirme que mon véhicule est en bon état de fonctionnement et qu'il répond 
            aux normes de sécurité requises pour un rallye.
          </Label>
        </div>
      </CardContent>
    </>
  );
};

export default VehicleInfoStep;
