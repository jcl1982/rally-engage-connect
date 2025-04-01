
import React from "react";
import { upcomingEvents } from "@/data/eventsData";
import { useParams } from "react-router-dom";

const PrintableRegistrationSummary = () => {
  const { id } = useParams();
  const event = upcomingEvents.find(e => e.id === id) || upcomingEvents[0];
  
  return (
    <div className="hidden print:block mb-8">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">Fiche d'Inscription</h1>
        <p>{event.title} • {event.date}</p>
      </div>
      
      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-bold mb-2">Informations Personnelles</h2>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="font-medium">Pilote:</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Licence:</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Email:</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Téléphone:</p>
            <p className="text-sm">________________</p>
          </div>
          <div className="col-span-2">
            <p className="font-medium">Adresse:</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Co-pilote:</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Expérience:</p>
            <p className="text-sm">________________</p>
          </div>
        </div>
      </div>
      
      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-bold mb-2">Véhicule</h2>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="font-medium">Marque:</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Modèle:</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Année:</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Immatriculation:</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Groupe/Classe:</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Puissance:</p>
            <p className="text-sm">________________ ch</p>
          </div>
          <div className="col-span-2">
            <p className="font-medium">Modifications:</p>
            <p className="text-sm">________________</p>
          </div>
        </div>
      </div>
      
      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-bold mb-2">Équipements de Sécurité</h2>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="font-medium">Arceau (n° homologation):</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Harnais (n° homologation):</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Sièges (n° homologation):</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Extincteur (n° homologation):</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Casques (n° homologation):</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">HANS (n° homologation):</p>
            <p className="text-sm">________________</p>
          </div>
        </div>
      </div>
      
      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-bold mb-2">Fiche d'Enregistrement des Équipements (FFSA-EQ-2023-V1)</h2>
        <table className="w-full border-collapse my-2">
          <thead>
            <tr className="border-b">
              <th className="py-1 text-left font-medium">Équipement</th>
              <th className="py-1 text-left font-medium">Pilote (n° homologation)</th>
              <th className="py-1 text-left font-medium">Copilote (n° homologation)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-1 font-medium">Casque</td>
              <td className="py-1">________________</td>
              <td className="py-1">________________</td>
            </tr>
            <tr className="border-b">
              <td className="py-1 font-medium">Système FHR</td>
              <td className="py-1">________________</td>
              <td className="py-1">________________</td>
            </tr>
            <tr className="border-b">
              <td className="py-1 font-medium">Combinaison</td>
              <td className="py-1">________________</td>
              <td className="py-1">________________</td>
            </tr>
            <tr className="border-b">
              <td className="py-1 font-medium">Sous-vêtements</td>
              <td className="py-1">________________</td>
              <td className="py-1">________________</td>
            </tr>
            <tr className="border-b">
              <td className="py-1 font-medium">Cagoule</td>
              <td className="py-1">________________</td>
              <td className="py-1">________________</td>
            </tr>
            <tr className="border-b">
              <td className="py-1 font-medium">Chaussures</td>
              <td className="py-1">________________</td>
              <td className="py-1">________________</td>
            </tr>
            <tr className="border-b">
              <td className="py-1 font-medium">Gants</td>
              <td className="py-1">________________</td>
              <td className="py-1">________________</td>
            </tr>
          </tbody>
        </table>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div>
            <p className="font-medium">Fait à:</p>
            <p className="text-sm">________________</p>
          </div>
          <div>
            <p className="font-medium">Le:</p>
            <p className="text-sm">________________</p>
          </div>
          <div className="col-span-2 mt-2">
            <p className="font-medium">Signature du concurrent:</p>
            <div className="h-12 border mt-1"></div>
          </div>
        </div>
      </div>
      
      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-bold mb-2">Paiement</h2>
        <div>
          <p className="font-medium">Total: 425 €</p>
          <p className="text-sm mt-4">Je soussigné(e) ________________ certifie l'exactitude des informations fournies ci-dessus et accepte les conditions générales de participation.</p>
          <div className="mt-8 flex justify-between">
            <div>
              <p className="font-medium mb-4">Date: ___/___/______</p>
            </div>
            <div>
              <p className="font-medium mb-4">Signature: ________________</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-center mt-8">
        <p>Document à présenter lors des vérifications administratives</p>
        <p>© {new Date().getFullYear()} - Rallye de France Championnat</p>
      </div>
    </div>
  );
};

export default PrintableRegistrationSummary;
