
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { upcomingEvents } from "@/data/eventsData";
import PersonalInfoStep from "@/components/registration/PersonalInfoStep";
import VehicleInfoStep from "@/components/registration/VehicleInfoStep";
import PaymentStep from "@/components/registration/PaymentStep";
import PrintableRegistrationSummary from "@/components/registration/PrintableRegistrationSummary";
import RegistrationHeader from "@/components/registration/RegistrationHeader";
import RegistrationSteps from "@/components/registration/RegistrationSteps";
import RegistrationFormActions from "@/components/registration/RegistrationFormActions";

const RegistrationPage = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  
  // Logo states for the organizer
  const [organizerLogo, setOrganizerLogo] = useState<string>("https://images.unsplash.com/photo-1494891848038-7bd202a2afeb");
  const [federationLogo, setFederationLogo] = useState<string>("https://images.unsplash.com/photo-1466442929976-97f336a657be");
  
  // Find the event in our data
  const event = upcomingEvents.find(e => e.id === id) || upcomingEvents[0];
  
  if (!event) {
    return <div>Événement non trouvé</div>;
  }
  
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Final submission
      toast({
        title: "Inscription réussie!",
        description: `Votre inscription au ${event.title} a été confirmée.`,
      });
      // In a real app, this would redirect to a confirmation page
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Upload handler for organizer logo
  const handleOrganizerLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setOrganizerLogo(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Upload handler for federation logo
  const handleFederationLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFederationLogo(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Render the current step content
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <VehicleInfoStep />;
      case 3:
        return <PaymentStep />;
      default:
        return <PersonalInfoStep />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container max-w-4xl">
          {/* Printable summary - only visible when printing */}
          <div className="hidden print:block">
            <PrintableRegistrationSummary 
              organizerLogo={organizerLogo}
              federationLogo={federationLogo}
            />
          </div>
          
          <RegistrationHeader 
            organizerLogo={organizerLogo}
            federationLogo={federationLogo}
            onOrganizerLogoUpload={handleOrganizerLogoUpload}
            onFederationLogoUpload={handleFederationLogoUpload}
          />
          
          <RegistrationSteps currentStep={currentStep} />
          
          <Card className="print:shadow-none print:border-none">
            <div className="print:hidden">
              {renderStep()}
            </div>
            
            <RegistrationFormActions 
              currentStep={currentStep}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </Card>
        </div>
      </main>
      <Footer />
      
      {/* Styles spécifiques pour l'impression des listes */}
      <style>
        {`
          @media print {
            /* Cacher les éléments non pertinents lors de l'impression de la liste des participants */
            .print-participants-only .dialog-content {
              display: block !important;
              position: relative;
              max-height: none;
              overflow: visible;
            }
            
            .print-participants-only .dialog-footer {
              display: none;
            }
            
            /* Assurer que le tableau s'imprime correctement */
            .print-participants-only table {
              width: 100%;
              border-collapse: collapse;
            }
            
            .print-participants-only th,
            .print-participants-only td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            
            .print-participants-only th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
          }
        `}
      </style>
    </div>
  );
};

export default RegistrationPage;
