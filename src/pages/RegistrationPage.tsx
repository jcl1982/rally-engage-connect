
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, CarFront, Check, CreditCard, FileText, Printer, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { upcomingEvents } from "@/data/eventsData";
import StepStatus from "@/components/registration/StepStatus";
import PersonalInfoStep from "@/components/registration/PersonalInfoStep";
import VehicleInfoStep from "@/components/registration/VehicleInfoStep";
import PaymentStep from "@/components/registration/PaymentStep";
import { printRegistrationForm } from "@/utils/printUtils";
import PrintableRegistrationSummary from "@/components/registration/PrintableRegistrationSummary";

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
  
  const handlePrint = () => {
    printRegistrationForm();
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
                    onChange={handleOrganizerLogoUpload}
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
                    onChange={handleFederationLogoUpload}
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
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 print:hidden">
            <StepStatus 
              step={1} 
              currentStep={currentStep} 
              title="Informations" 
              icon={<User className="w-4 h-4" />} 
            />
            <StepStatus 
              step={2} 
              currentStep={currentStep} 
              title="Véhicule" 
              icon={<CarFront className="w-4 h-4" />} 
            />
            <StepStatus 
              step={3} 
              currentStep={currentStep} 
              title="Paiement" 
              icon={<CreditCard className="w-4 h-4" />} 
            />
            <StepStatus 
              step={4} 
              currentStep={currentStep} 
              title="Confirmation" 
              icon={<FileText className="w-4 h-4" />} 
            />
          </div>
          
          <Card className="print:shadow-none print:border-none">
            <div className="print:hidden">
              {renderStep()}
            </div>
            
            <CardFooter className="flex justify-between print:hidden">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={handlePrevious}>
                  Précédent
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link to={`/events/${id}`}>Annuler</Link>
                </Button>
              )}
              
              <Button 
                className="bg-rally-orange hover:bg-rally-orange/90" 
                onClick={handleNext}
              >
                {currentStep < 3 ? "Suivant" : "Confirmer et payer"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationPage;
