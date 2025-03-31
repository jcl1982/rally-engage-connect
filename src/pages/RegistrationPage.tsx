
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, CarFront, Check, CreditCard, FileText, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { upcomingEvents } from "@/data/eventsData";
import StepStatus from "@/components/registration/StepStatus";
import PersonalInfoStep from "@/components/registration/PersonalInfoStep";
import VehicleInfoStep from "@/components/registration/VehicleInfoStep";
import PaymentStep from "@/components/registration/PaymentStep";

const RegistrationPage = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Inscription</h1>
            <p className="text-muted-foreground">
              {event.title} • {event.date}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
          
          <Card>
            {renderStep()}
            
            <CardFooter className="flex justify-between">
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
