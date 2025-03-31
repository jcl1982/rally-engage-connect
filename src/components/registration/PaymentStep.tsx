
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentStep = () => {
  return (
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
  );
};

export default PaymentStep;
