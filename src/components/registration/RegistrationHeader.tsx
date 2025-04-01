
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { printRegistrationForm } from "@/utils/printUtils";
import { useParams } from "react-router-dom";
import { upcomingEvents } from "@/data/eventsData";

interface RegistrationHeaderProps {
  organizerLogo: string;
  federationLogo: string;
  onOrganizerLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFederationLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegistrationHeader: React.FC<RegistrationHeaderProps> = ({
  organizerLogo,
  federationLogo,
  onOrganizerLogoUpload,
  onFederationLogoUpload
}) => {
  const { id } = useParams();
  const event = upcomingEvents.find(e => e.id === id) || upcomingEvents[0];

  const handlePrint = () => {
    printRegistrationForm();
  };

  return (
    <div className="text-center mb-8 print:hidden">
      <h1 className="text-3xl font-bold mb-2">Inscription</h1>
      <p className="text-muted-foreground">
        {event.title} • {event.date}
      </p>
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <Button 
          variant="outline" 
          size="sm" 
          className="print:hidden" 
          onClick={handlePrint}
        >
          <Printer className="mr-2 h-4 w-4" />
          Imprimer la fiche d'engagement
        </Button>
        
        {/* Logo upload buttons */}
        <div className="flex gap-2 mt-2 md:mt-0">
          <div>
            <input
              type="file"
              id="organizerLogo"
              accept="image/*"
              onChange={onOrganizerLogoUpload}
              className="hidden"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="print:hidden"
              onClick={() => document.getElementById('organizerLogo')?.click()}
            >
              <span>Logo Organisateur</span>
            </Button>
          </div>
          
          <div>
            <input
              type="file"
              id="federationLogo"
              accept="image/*"
              onChange={onFederationLogoUpload}
              className="hidden"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="print:hidden"
              onClick={() => document.getElementById('federationLogo')?.click()}
            >
              <span>Logo Fédération</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Preview of uploaded logos */}
      <LogoPreview organizerLogo={organizerLogo} federationLogo={federationLogo} />
    </div>
  );
};

const LogoPreview: React.FC<{organizerLogo: string; federationLogo: string}> = ({ 
  organizerLogo, 
  federationLogo 
}) => {
  return (
    <div className="flex justify-center items-center gap-8 mt-4 print:hidden">
      <div className="w-16 h-16">
        {organizerLogo && (
          <img 
            src={organizerLogo} 
            alt="Logo organisateur" 
            className="object-contain w-full h-full"
          />
        )}
      </div>
      <div className="w-16 h-16">
        {federationLogo && (
          <img 
            src={federationLogo} 
            alt="Logo fédération" 
            className="object-contain w-full h-full"
          />
        )}
      </div>
    </div>
  );
};

export default RegistrationHeader;
