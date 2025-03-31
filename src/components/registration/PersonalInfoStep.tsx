
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PersonalInfoStep = () => {
  return (
    <>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
        <CardDescription>
          Veuillez saisir vos informations de pilote
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstname">Prénom</Label>
            <Input id="firstname" placeholder="Votre prénom" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname">Nom</Label>
            <Input id="lastname" placeholder="Votre nom" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="votre@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input id="phone" placeholder="+33 6 XX XX XX XX" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Adresse</Label>
          <Input id="address" placeholder="Votre adresse" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="zip">Code postal</Label>
            <Input id="zip" placeholder="Code postal" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="city">Ville</Label>
            <Input id="city" placeholder="Ville" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="license">Numéro de licence</Label>
          <Input id="license" placeholder="Numéro de licence FFSA" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="experience">Expérience en rallye</Label>
          <Select defaultValue="beginner">
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre niveau d'expérience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Débutant (0-2 rallyes)</SelectItem>
              <SelectItem value="intermediate">Intermédiaire (3-10 rallyes)</SelectItem>
              <SelectItem value="experienced">Expérimenté (11-20 rallyes)</SelectItem>
              <SelectItem value="professional">Professionnel (20+ rallyes)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="copilot">Informations du copilote (optionnel)</Label>
          <Input id="copilot" placeholder="Nom et prénom du copilote" />
        </div>
      </CardContent>
    </>
  );
};

export default PersonalInfoStep;
