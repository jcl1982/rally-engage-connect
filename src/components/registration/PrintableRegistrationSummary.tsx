
import React from "react";
import { upcomingEvents } from "@/data/eventsData";
import { useParams } from "react-router-dom";
import { LogoHeader, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface PrintableRegistrationSummaryProps {
  organizerLogo?: string;
  federationLogo?: string;
}

const PrintableRegistrationSummary: React.FC<PrintableRegistrationSummaryProps> = ({
  organizerLogo,
  federationLogo
}) => {
  const { id } = useParams();
  const event = upcomingEvents.find(e => e.id === id) || upcomingEvents[0];
  
  return (
    <div className="hidden print:block mb-8">
      <LogoHeader 
        leftLogo={organizerLogo} 
        rightLogo={federationLogo} 
        title={`FEUILLE D'ENGAGEMENT - ${event.title}`}
      />
      
      <div className="border-2 border-black rounded-md p-4 mb-6">
        <h2 className="text-lg font-bold mb-4 text-center uppercase">CONCURRENT / ENTRANT</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Nom du concurrent / Entrant name:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
          <div>
            <p className="font-medium">N° de licence / Competition licence No:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
          <div>
            <p className="font-medium">ASN d'appartenance / Issuing ASN:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
          <div>
            <p className="font-medium">N° téléphone / Phone No:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
          <div className="col-span-2">
            <p className="font-medium">Adresse email / Email address:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="border-2 border-black rounded-md p-4">
          <h2 className="text-lg font-bold mb-4 text-center uppercase">PILOTE / DRIVER</h2>
          <div className="space-y-3">
            <div>
              <p className="font-medium">Nom / Surname:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Prénom / First name:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Date de naissance / Date of birth:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Nationalité / Nationality:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">N° de licence / Competition licence No:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">ASN d'appartenance / Issuing ASN:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">N° téléphone / Phone No:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Adresse email / Email address:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Adresse / Address:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Ville / City:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Pays / Country:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
          </div>
        </div>
        
        <div className="border-2 border-black rounded-md p-4">
          <h2 className="text-lg font-bold mb-4 text-center uppercase">COPILOTE / CO-DRIVER</h2>
          <div className="space-y-3">
            <div>
              <p className="font-medium">Nom / Surname:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Prénom / First name:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Date de naissance / Date of birth:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Nationalité / Nationality:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">N° de licence / Competition licence No:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">ASN d'appartenance / Issuing ASN:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">N° téléphone / Phone No:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Adresse email / Email address:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Adresse / Address:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Ville / City:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Pays / Country:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-2 border-black rounded-md p-4 mb-6">
        <h2 className="text-lg font-bold mb-4 text-center uppercase">VOITURE / CAR</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <p className="font-medium">Marque / Make:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
          <div>
            <p className="font-medium">Modèle / Model:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
          <div>
            <p className="font-medium">Année de fabrication / Year of manufacture:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
          <div>
            <p className="font-medium">Groupe / Group:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
          <div>
            <p className="font-medium">Classe / Class:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
          <div>
            <p className="font-medium">N° d'homologation / Homologation No:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
          <div>
            <p className="font-medium">Pays d'immatriculation / Country of registration:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
          <div>
            <p className="font-medium">N° d'immatriculation / Registration No:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
          <div>
            <p className="font-medium">N° de Passeport technique / Technical Passport No:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
          <div>
            <p className="font-medium">Cylindrée / Cubic capacity:</p>
            <p className="text-sm border-b border-gray-400 h-6">________________</p>
          </div>
        </div>
      </div>
      
      <div className="border-2 border-black rounded-md p-4 mb-6">
        <h2 className="text-lg font-bold mb-4 text-center uppercase">DROITS D'ENGAGEMENT / ENTRY FEES</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-x-4">
            <div className="flex items-center">
              <div className="h-5 w-5 border border-black mr-2"></div>
              <p className="font-medium">Avec publicité organisateur / With organizer's advertising</p>
            </div>
            <div className="flex items-center">
              <div className="h-5 w-5 border border-black mr-2"></div>
              <p className="font-medium">Concurrent privé / Private competitor</p>
            </div>
            <div className="text-right">
              <p className="font-medium">425 €</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-x-4">
            <div className="flex items-center">
              <div className="h-5 w-5 border border-black mr-2"></div>
              <p className="font-medium">Sans publicité organisateur / Without organizer's advertising</p>
            </div>
            <div className="flex items-center">
              <div className="h-5 w-5 border border-black mr-2"></div>
              <p className="font-medium">Concurrent privé / Private competitor</p>
            </div>
            <div className="text-right">
              <p className="font-medium">850 €</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 mt-6">
            <p className="font-medium">Mode de paiement / Payment mode:</p>
            <div className="flex gap-8 mt-2">
              <div className="flex items-center">
                <div className="h-5 w-5 border border-black mr-2"></div>
                <p className="font-medium">Virement / Bank transfer</p>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 border border-black mr-2"></div>
                <p className="font-medium">Chèque / Cheque</p>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 border border-black mr-2"></div>
                <p className="font-medium">Espèces / Cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-2 border-black rounded-md p-4 mb-6">
        <h2 className="text-lg font-bold mb-4 text-center uppercase">DÉCLARATION / DECLARATION</h2>
        <div>
          <p className="text-sm mb-4">
            Je soussigné déclare sur l'honneur que toutes les informations fournies sur la présente demande d'engagement sont strictement exactes. Je reconnais être seul responsable de l'exactitude de ces déclarations. Je déclare respecter les règlements sportifs et techniques de cette épreuve et accepte que tout changement du véhicule concernant l'identité ou l'équipement puisse entraîner l'exclusion. Je m'engage à présenter mon passeport technique, ma licence et toutes les autorisations nécessaires lors des vérifications administratives.
          </p>
          <p className="text-sm italic mb-6">
            I, the undersigned, declare that all the information provided on this entry form is strictly accurate. I acknowledge that I am solely responsible for the accuracy of these declarations. I declare that I will comply with the sporting and technical regulations of this event and accept that any change to the vehicle regarding identity or equipment may result in exclusion. I undertake to present my technical passport, license, and all necessary authorizations during administrative checks.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mt-10">
            <div className="space-y-2">
              <div className="flex">
                <p className="font-medium">Fait à / Signed in:</p>
                <p className="text-sm border-b border-gray-400 flex-grow ml-2">________________</p>
              </div>
              <div className="flex">
                <p className="font-medium">Date:</p>
                <p className="text-sm border-b border-gray-400 flex-grow ml-2">________________</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Signature du concurrent / Signature of entrant:</p>
              <div className="h-20 border border-gray-400"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-2 border-black rounded-md p-4 mb-6">
        <h2 className="text-lg font-bold mb-4 text-center uppercase">RÉSERVÉ À L'ORGANISATION / FOR ORGANIZER'S USE ONLY</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <p className="font-medium">N° de course / Car No:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Groupe / Group:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
            <div>
              <p className="font-medium">Classe / Class:</p>
              <p className="text-sm border-b border-gray-400 h-6">________________</p>
            </div>
          </div>
          <div>
            <div className="space-y-3">
              <div>
                <p className="font-medium">N° d'ordre / Position No:</p>
                <p className="text-sm border-b border-gray-400 h-6">________________</p>
              </div>
              <div>
                <p className="font-medium">Date de réception / Receipt date:</p>
                <p className="text-sm border-b border-gray-400 h-6">________________</p>
              </div>
              <div>
                <p className="font-medium">Montant / Amount:</p>
                <p className="text-sm border-b border-gray-400 h-6">________________</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-center mt-8">
        <p>© {new Date().getFullYear()} - Rallye de France Championnat</p>
        <p className="mt-1">Document à présenter lors des vérifications administratives</p>
      </div>
    </div>
  );
};

export default PrintableRegistrationSummary;
