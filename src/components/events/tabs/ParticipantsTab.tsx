
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Car, Download, FileSpreadsheet, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

interface ParticipantsTabProps {
  event: {
    participants: number;
    maxParticipants: number;
  };
}

const ParticipantsTab: React.FC<ParticipantsTabProps> = ({ event }) => {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  // Exemple de données des participants pour la démonstration
  const participantsData = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    name: `Pilote ${i + 1}`,
    car: "Alpine A110",
    category: "Amateur",
    number: `${i + 10}`,
    team: `Team ${String.fromCharCode(65 + i)}`,
    registrationDate: `2024-${String(i + 6).padStart(2, '0')}-${String((i * 3) + 10).padStart(2, '0')}`,
  }));

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
              onClick={() => setExportDialogOpen(true)}
            >
              <FileSpreadsheet className="w-4 h-4" />
              Exporter la liste
            </Button>
          </div>
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
              <Button onClick={handleExportCsv} className="flex items-center gap-2 bg-rally-orange hover:bg-rally-orange/90">
                <Download className="w-4 h-4" />
                Exporter CSV
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParticipantsTab;
