
import React from "react";
import { CarFront, FileText, User, CreditCard } from "lucide-react";
import StepStatus from "@/components/registration/StepStatus";

interface RegistrationStepsProps {
  currentStep: number;
}

const RegistrationSteps: React.FC<RegistrationStepsProps> = ({ currentStep }) => {
  return (
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
  );
};

export default RegistrationSteps;
