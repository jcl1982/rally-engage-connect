
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Download, FileSpreadsheet, FileText, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import * as XLSX from 'xlsx';

interface ParticipantsTabProps {
  event: {
    participants: number;
    maxParticipants: number;
  };
}

interface Participant {
  id: number;
  name: string;
  car: string;
  category: string;
  number: string;
  team: string;
  registrationDate: string;
}

const ParticipantsTab: React.FC<ParticipantsTabProps> = ({ event }) => {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const { toast } = useToast();

  // État pour stocker les participants
  const [participantsData, setParticipantsData] = useState<Participant[]>(
    Array.from({ length: 5 }).map((_, i) => ({
      id: i + 1,
      name: `Pilote ${i + 1}`,
      car: "Alpine A110",
      category: "Amateur",
      number: `${i + 10}`,
      team: `Team ${String.fromCharCode(65 + i)}`,
      registrationDate: `2024-${String(i + 6).padStart(2, '0')}-${String((i * 3) + 10).padStart(2, '0')}`,
    }))
  );

  const handleExportCsv = () => {
    // Préparer les en-têtes CSV
    const headers = ["Numéro", "Nom", "Véhicule", "Catégorie", "Équipe", "Date d'inscription"];
    
    // Préparer les données CSV
    const csvData = participantsData.map(p => [
      p.number,
      p.name,
      p.car,
      p.category,
      p.team,
      new Date(p.registrationDate).toLocaleDateString('fr-FR')
    ]);
    
    // Combiner les en-têtes et les données
    const allRows = [headers, ...csvData];
    
    // Convertir en format CSV
    const csvContent = allRows.map(row => row.join(';')).join('\n');
    
    // Créer un blob et télécharger
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `participants-liste-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Fermer le dialogue après l'exportation
    setExportDialogOpen(false);
  };

  const handleExportExcel = () => {
    // Créer un nouveau classeur
    const workbook = XLSX.utils.book_new();
    
    // Préparer les données pour Excel
    const excelData = participantsData.map(p => ({
      'Numéro': p.number,
      'Nom': p.name,
      'Véhicule': p.car,
      'Catégorie': p.category,
      'Équipe': p.team,
      'Date d\'inscription': new Date(p.registrationDate).toLocaleDateString('fr-FR')
    }));
    
    // Créer une feuille de calcul
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Ajouter la feuille au classeur
    XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");
    
    // Générer le fichier Excel et le télécharger
    XLSX.writeFile(workbook, `participants-liste-${new Date().toISOString().split('T')[0]}.xlsx`);
    
    // Fermer le dialogue
    setExportDialogOpen(false);
  };

  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Vérification de la structure minimale des données
        if (jsonData.length === 0) {
          throw new Error("Le fichier ne contient pas de données");
        }

        // Convertir les données importées au format attendu
        const importedParticipants: Participant[] = jsonData.map((row: any, index) => {
          return {
            id: index + 1,
            name: row['Nom'] || row['name'] || row['Pilote'] || 'Sans nom',
            car: row['Véhicule'] || row['car'] || row['Voiture'] || 'Non spécifié',
            category: row['Catégorie'] || row['category'] || 'Amateur',
            number: row['Numéro'] || row['number'] || String(index + 10),
            team: row['Équipe'] || row['team'] || 'Non spécifié',
            registrationDate: row['Date d\'inscription'] || new Date().toISOString().split('T')[0]
          };
        });

        // Mettre à jour l'état avec les nouveaux participants
        setParticipantsData(importedParticipants);
        setImportDialogOpen(false);
        
        toast({
          title: "Import réussi",
          description: `${importedParticipants.length} participants ont été importés avec succès.`,
        });
      } catch (error) {
        console.error("Erreur lors de l'importation Excel:", error);
        toast({
          title: "Erreur d'importation",
          description: "Le format du fichier Excel n'est pas valide ou ne contient pas les données attendues.",
          variant: "destructive"
        });
      }
    };

    reader.onerror = () => {
      toast({
        title: "Erreur de lecture",
        description: "Une erreur s'est produite lors de la lecture du fichier.",
        variant: "destructive"
      });
    };

    reader.readAsBinaryString(file);
  };

  const handlePrint = () => {
    window.print();
    setExportDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 bg-card rounded-lg border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Participants inscrits</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground mr-2">{event.participants}/{event.maxParticipants} inscrits</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setImportDialogOpen(true)}
            >
              <Upload className="w-4 h-4" />
              Importer
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setExportDialogOpen(true)}
            >
              <FileSpreadsheet className="w-4 h-4" />
              Exporter
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {participantsData.slice(0, 5).map((participant) => (
            <div key={participant.id} className="flex items-center p-3 border rounded-md">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <Car className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h4 className="font-medium">{participant.name}</h4>
                <p className="text-sm text-muted-foreground">Véhicule: {participant.car} • Catégorie: {participant.category}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => setExportDialogOpen(true)}>Voir tous les participants</Button>
        </div>
      </div>

      {/* Dialogue d'exportation */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Liste des participants</DialogTitle>
            <DialogDescription>
              Exporter ou imprimer la liste complète des participants inscrits à cet événement.
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Équipe</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participantsData.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell>{participant.number}</TableCell>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell>{participant.car}</TableCell>
                    <TableCell>{participant.category}</TableCell>
                    <TableCell>{participant.team}</TableCell>
                    <TableCell>{new Date(participant.registrationDate).toLocaleDateString('fr-FR')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between mt-4">
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
              Fermer
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Imprimer
              </Button>
              <Button onClick={handleExportCsv} className="flex items-center gap-2 bg-asag-green hover:bg-asag-green/90">
                <Download className="w-4 h-4" />
                Exporter CSV
              </Button>
              <Button onClick={handleExportExcel} className="flex items-center gap-2 bg-rally-orange hover:bg-rally-orange/90">
                <FileSpreadsheet className="w-4 h-4" />
                Exporter Excel
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue d'importation */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Importer des participants</DialogTitle>
            <DialogDescription>
              Importez une liste de participants à partir d'un fichier Excel (.xlsx)
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              Le fichier doit contenir les colonnes suivantes: Nom, Véhicule, Catégorie, Numéro, Équipe, Date d'inscription
            </p>
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Input 
                id="excel-file" 
                type="file" 
                accept=".xlsx, .xls" 
                onChange={handleImportExcel}
                className="cursor-pointer"
              />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="button" className="bg-asag-green hover:bg-asag-green/90">
              Télécharger un modèle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParticipantsTab;
