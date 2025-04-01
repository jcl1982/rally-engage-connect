
import React from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";

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
  
  return (
    <CardFooter className="flex justify-between print:hidden">
      {currentStep > 1 ? (
        <Button variant="outline" onClick={onPrevious}>
          Précédent
        </Button>
      ) : (
        <Button variant="outline" asChild>
          <Link to={`/events/${id}`}>Annuler</Link>
        </Button>
      )}
      
      <Button 
        className="bg-rally-orange hover:bg-rally-orange/90" 
        onClick={onNext}
      >
        {currentStep < 3 ? "Suivant" : "Confirmer et payer"}
      </Button>
    </CardFooter>
  );
};

export default RegistrationFormActions;
