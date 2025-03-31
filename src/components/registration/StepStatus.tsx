
import React from "react";
import { Check } from "lucide-react";

type StepStatusProps = { 
  step: number; 
  currentStep: number; 
  title: string; 
  icon: React.ReactNode 
};

const StepStatus: React.FC<StepStatusProps> = ({ 
  step, 
  currentStep, 
  title, 
  icon 
}) => {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div className="flex items-center gap-2">
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isCompleted 
            ? "bg-green-100 text-green-600" 
            : isActive 
              ? "bg-rally-orange text-white" 
              : "bg-gray-100 text-gray-400"
        }`}
      >
        {isCompleted ? <Check className="w-4 h-4" /> : icon}
      </div>
      <span className={isActive ? "font-medium" : "text-muted-foreground"}>{title}</span>
    </div>
  );
};

export default StepStatus;
