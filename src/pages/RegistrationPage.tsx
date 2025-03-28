
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, CarFront, Check, CreditCard, FileText, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { upcomingEvents } from "@/data/eventsData";

const StepStatus = ({ 
  step, 
  currentStep, 
  title, 
  icon 
}: { 
  step: number; 
  currentStep: number; 
  title: string; 
  icon: React.ReactNode 
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
            {currentStep === 1 && (
              <>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Veuillez saisir vos informations de pilote
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstname">Prénom</Label>
                      <Input id="firstname" placeholder="Votre prénom" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname">Nom</Label>
                      <Input id="lastname" placeholder="Votre nom" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="votre@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" placeholder="+33 6 XX XX XX XX" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input id="address" placeholder="Votre adresse" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="zip">Code postal</Label>
                      <Input id="zip" placeholder="Code postal" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input id="city" placeholder="Ville" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="license">Numéro de licence</Label>
                    <Input id="license" placeholder="Numéro de licence FFSA" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Expérience en rallye</Label>
                    <Select defaultValue="beginner">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre niveau d'expérience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Débutant (0-2 rallyes)</SelectItem>
                        <SelectItem value="intermediate">Intermédiaire (3-10 rallyes)</SelectItem>
                        <SelectItem value="experienced">Expérimenté (11-20 rallyes)</SelectItem>
                        <SelectItem value="professional">Professionnel (20+ rallyes)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="copilot">Informations du copilote (optionnel)</Label>
                    <Input id="copilot" placeholder="Nom et prénom du copilote" />
                  </div>
                </CardContent>
              </>
            )}
            
            {currentStep === 2 && (
              <>
                <CardHeader>
                  <CardTitle>Informations du véhicule</CardTitle>
                  <CardDescription>
                    Veuillez saisir les détails de votre véhicule
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="make">Marque</Label>
                      <Input id="make" placeholder="Ex: Renault, Peugeot, Alpine..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Modèle</Label>
                      <Input id="model" placeholder="Ex: Clio, 208, A110..." />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="year">Année</Label>
                      <Input id="year" placeholder="Ex: 2020" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registration">Immatriculation</Label>
                      <Input id="registration" placeholder="Ex: AB-123-CD" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select defaultValue="amateur">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez la catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pro">Catégorie Pro</SelectItem>
                        <SelectItem value="amateur">Catégorie Amateur</SelectItem>
                        <SelectItem value="classic">Catégorie Classique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="power">Puissance (ch)</Label>
                    <Input id="power" placeholder="Ex: 180" type="number" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="modifications">Modifications / Préparations</Label>
                    <Input id="modifications" placeholder="Décrivez les modifications apportées" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="technical" />
                    <Label htmlFor="technical" className="text-sm font-normal">
                      Je confirme que mon véhicule est en bon état de fonctionnement et qu'il répond 
                      aux normes de sécurité requises pour un rallye.
                    </Label>
                  </div>
                </CardContent>
              </>
            )}
            
            {currentStep === 3 && (
              <>
                <CardHeader>
                  <CardTitle>Paiement</CardTitle>
                  <CardDescription>
                    Veuillez procéder au paiement pour finaliser votre inscription
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-accent p-4 rounded-md">
                    <h3 className="font-medium mb-2">Récapitulatif</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Frais d'inscription</span>
                        <span>350 €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assurance</span>
                        <span>50 €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Roadbook et matériel</span>
                        <span>25 €</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>425 €</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardname">Nom sur la carte</Label>
                    <Input id="cardname" placeholder="Nom complet" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardnumber">Numéro de carte</Label>
                    <Input id="cardnumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Date d'expiration</Label>
                      <Input id="expiry" placeholder="MM/AA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      J'accepte les conditions générales et le règlement du rallye.
                    </Label>
                  </div>
                </CardContent>
              </>
            )}
            
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
