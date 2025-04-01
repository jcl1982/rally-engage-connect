
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { HardHat, Shield, User, CalendarDays } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const CrewEquipmentTab = () => {
  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <HardHat className="h-5 w-5 text-rally-orange" />
            Fiche d'Enregistrement des Équipements
          </h3>
          <div className="text-sm text-muted-foreground">FFSA-EQ-2023-V1</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="competitor-name">Concurrent</Label>
            <Input id="competitor-name" placeholder="Nom du concurrent" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="competition-date">Date de l'épreuve</Label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="competition-date" placeholder="JJ/MM/AAAA" className="pl-10" />
            </div>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-md mb-6">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-rally-orange" />
            <h4 className="font-medium">Équipage</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="driver-name">Pilote</Label>
              <Input id="driver-name" placeholder="Nom complet du pilote" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="driver-license">N° Licence</Label>
              <Input id="driver-license" placeholder="Numéro de licence" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codriver-name">Copilote</Label>
              <Input id="codriver-name" placeholder="Nom complet du copilote" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codriver-license">N° Licence</Label>
              <Input id="codriver-license" placeholder="Numéro de licence" />
            </div>
          </div>
        </div>
        
        <div className="border rounded-md p-0 overflow-hidden">
          <Table>
            <TableCaption>Déclaration des équipements de sécurité</TableCaption>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-medium">Équipement</TableHead>
                <TableHead className="font-medium">Pilote</TableHead>
                <TableHead className="font-medium text-right md:text-left">Copilote</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Casque</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Input id="driver-helmet" placeholder="Marque et modèle" className="h-8 text-sm" />
                    <div className="flex gap-2 items-center">
                      <Label htmlFor="driver-helmet-homologation" className="whitespace-nowrap text-xs min-w-24">N° Homologation:</Label>
                      <Input id="driver-helmet-homologation" placeholder="N°" className="h-7 text-xs" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right md:text-left">
                  <div className="space-y-2">
                    <Input id="codriver-helmet" placeholder="Marque et modèle" className="h-8 text-sm" />
                    <div className="flex gap-2 items-center">
                      <Label htmlFor="codriver-helmet-homologation" className="whitespace-nowrap text-xs min-w-24">N° Homologation:</Label>
                      <Input id="codriver-helmet-homologation" placeholder="N°" className="h-7 text-xs" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Système FHR</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Input id="driver-fhr" placeholder="Marque et modèle" className="h-8 text-sm" />
                    <div className="flex gap-2 items-center">
                      <Label htmlFor="driver-fhr-homologation" className="whitespace-nowrap text-xs min-w-24">N° Homologation:</Label>
                      <Input id="driver-fhr-homologation" placeholder="N°" className="h-7 text-xs" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right md:text-left">
                  <div className="space-y-2">
                    <Input id="codriver-fhr" placeholder="Marque et modèle" className="h-8 text-sm" />
                    <div className="flex gap-2 items-center">
                      <Label htmlFor="codriver-fhr-homologation" className="whitespace-nowrap text-xs min-w-24">N° Homologation:</Label>
                      <Input id="codriver-fhr-homologation" placeholder="N°" className="h-7 text-xs" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Combinaison</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Input id="driver-suit" placeholder="Marque et modèle" className="h-8 text-sm" />
                    <div className="flex gap-2 items-center">
                      <Label htmlFor="driver-suit-homologation" className="whitespace-nowrap text-xs min-w-24">N° Homologation:</Label>
                      <Input id="driver-suit-homologation" placeholder="N°" className="h-7 text-xs" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right md:text-left">
                  <div className="space-y-2">
                    <Input id="codriver-suit" placeholder="Marque et modèle" className="h-8 text-sm" />
                    <div className="flex gap-2 items-center">
                      <Label htmlFor="codriver-suit-homologation" className="whitespace-nowrap text-xs min-w-24">N° Homologation:</Label>
                      <Input id="codriver-suit-homologation" placeholder="N°" className="h-7 text-xs" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Sous-vêtements</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Input id="driver-underwear" placeholder="Marque et modèle" className="h-8 text-sm" />
                    <div className="flex gap-2 items-center">
                      <Label htmlFor="driver-underwear-homologation" className="whitespace-nowrap text-xs min-w-24">N° Homologation:</Label>
                      <Input id="driver-underwear-homologation" placeholder="N°" className="h-7 text-xs" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right md:text-left">
                  <div className="space-y-2">
                    <Input id="codriver-underwear" placeholder="Marque et modèle" className="h-8 text-sm" />
                    <div className="flex gap-2 items-center">
                      <Label htmlFor="codriver-underwear-homologation" className="whitespace-nowrap text-xs min-w-24">N° Homologation:</Label>
                      <Input id="codriver-underwear-homologation" placeholder="N°" className="h-7 text-xs" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Cagoule</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Input id="driver-balaclava" placeholder="Marque et modèle" className="h-8 text-sm" />
                    <div className="flex gap-2 items-center">
                      <Label htmlFor="driver-balaclava-homologation" className="whitespace-nowrap text-xs min-w-24">N° Homologation:</Label>
                      <Input id="driver-balaclava-homologation" placeholder="N°" className="h-7 text-xs" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right md:text-left">
                  <div className="space-y-2">
                    <Input id="codriver-balaclava" placeholder="Marque et modèle" className="h-8 text-sm" />
                    <div className="flex gap-2 items-center">
                      <Label htmlFor="codriver-balaclava-homologation" className="whitespace-nowrap text-xs min-w-24">N° Homologation:</Label>
                      <Input id="codriver-balaclava-homologation" placeholder="N°" className="h-7 text-xs" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Chaussures</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Input id="driver-boots" placeholder="Marque et modèle" className="h-8 text-sm" />
                    <div className="flex gap-2 items-center">
                      <Label htmlFor="driver-boots-homologation" className="whitespace-nowrap text-xs min-w-24">N° Homologation:</Label>
                      <Input id="driver-boots-homologation" placeholder="N°" className="h-7 text-xs" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right md:text-left">
                  <div className="space-y-2">
                    <Input id="codriver-boots" placeholder="Marque et modèle" className="h-8 text-sm" />
                    <div className="flex gap-2 items-center">
                      <Label htmlFor="codriver-boots-homologation" className="whitespace-nowrap text-xs min-w-24">N° Homologation:</Label>
                      <Input id="codriver-boots-homologation" placeholder="N°" className="h-7 text-xs" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Gants</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Input id="driver-gloves" placeholder="Marque et modèle" className="h-8 text-sm" />
                    <div className="flex gap-2 items-center">
                      <Label htmlFor="driver-gloves-homologation" className="whitespace-nowrap text-xs min-w-24">N° Homologation:</Label>
                      <Input id="driver-gloves-homologation" placeholder="N°" className="h-7 text-xs" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right md:text-left">
                  <div className="space-y-2">
                    <Input id="codriver-gloves" placeholder="Marque et modèle" className="h-8 text-sm" />
                    <div className="flex gap-2 items-center">
                      <Label htmlFor="codriver-gloves-homologation" className="whitespace-nowrap text-xs min-w-24">N° Homologation:</Label>
                      <Input id="codriver-gloves-homologation" placeholder="N°" className="h-7 text-xs" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 border rounded-md mt-4">
          <p className="text-sm italic text-muted-foreground mb-2">Je, soussigné(e), certifie l'exactitude des informations sur cette fiche d'équipements.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="space-y-2">
              <Label htmlFor="signature-place">Fait à</Label>
              <Input id="signature-place" placeholder="Lieu" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signature-date">Le</Label>
              <Input id="signature-date" placeholder="Date" />
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="signature">Signature</Label>
            <div className="h-24 border rounded-md bg-gray-50 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Signature du concurrent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewEquipmentTab;
