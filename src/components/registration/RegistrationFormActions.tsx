
import React from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { Printer } from "lucide-react";

interface RegistrationFormActionsProps {
  currentStep: number;
  onPrevious: () => void;
  onNext: () => void;
}

const RegistrationFormActions: React.FC<RegistrationFormActionsProps> = ({
  currentStep,
  onPrevious,
  onNext
}) => {
  const { id } = useParams();
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <CardFooter className="flex justify-between print:hidden">
      <div className="flex gap-2">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={onPrevious}>
            Précédent
          </Button>
        ) : (
          <Button variant="outline" asChild>
            <Link to={`/events/${id}`}>Annuler</Link>
          </Button>
        )}
        
        {currentStep === 3 && (
          <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Imprimer
          </Button>
        )}
      </div>
      
      <Button 
        className="bg-asag-red hover:bg-asag-red/90 text-white" 
        onClick={onNext}
      >
        {currentStep < 3 ? "Suivant" : "Confirmer et payer"}
      </Button>
    </CardFooter>
  );
};

export default RegistrationFormActions;
