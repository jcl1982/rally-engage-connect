
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SuperUserPromotion: React.FC = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("admin");
  const [loading, setLoading] = useState(false);
  const [autoPromoteStatus, setAutoPromoteStatus] = useState<Record<string, string>>({});

  const handlePromoteUser = async () => {
    if (!email || !email.includes('@')) {
      toast.error("Veuillez saisir une adresse email valide");
      return;
    }

    setLoading(true);
    try {
      const result = await promoteUser(email, role);
      if (result.success) {
        toast.success(result.message);
        setEmail("");
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error("Erreur lors de la promotion de l'utilisateur:", error.message);
      toast.error(`Erreur: ${error.message || "Impossible de promouvoir cet utilisateur"}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user promotion
  const promoteUser = async (userEmail: string, userRole: string) => {
    console.log(`Tentative de promotion de ${userEmail} comme ${userRole}`);
    
    try {
      const { data, error } = await supabase.functions.invoke('promote-user-role', {
        body: { email: userEmail, role: userRole }
      });

      if (error) {
        console.error(`Erreur API lors de l'invocation de la fonction:`, error);
        return { success: false, error: error.message };
      }

      if (data.error) {
        console.error(`Erreur retournée par la fonction:`, data.error);
        return { success: false, error: data.error };
      }

      console.log(`Promotion réussie pour ${userEmail}:`, data.message);
      return { success: true, message: data.message || `L'utilisateur ${userEmail} est maintenant un ${userRole}` };
    } catch (error: any) {
      console.error(`Exception lors de la promotion de ${userEmail}:`, error.message);
      return { success: false, error: error.message || "Erreur inconnue" };
    }
  };

  const roleOptions = [
    { value: "admin", label: "Administrateur" },
    { value: "organizer", label: "Organisateur" },
  ];

  // Promotion automatique pour les utilisateurs spécifiques
  useEffect(() => {
    const promoteSpecificUsers = async () => {
      const specificUsers = [
        { email: "j.cleonis1982@gmail.com", role: "organizer" },
        { email: "tresorier@asaguadeloupe.fr", role: "organizer" }
      ];

      setAutoPromoteStatus({});
      
      for (const user of specificUsers) {
        try {
          setAutoPromoteStatus(prev => ({
            ...prev,
            [user.email]: "en cours..."
          }));
          
          const result = await promoteUser(user.email, user.role);
          
          setAutoPromoteStatus(prev => ({
            ...prev,
            [user.email]: result.success ? "succès" : `échec: ${result.error}`
          }));
          
        } catch (error: any) {
          console.error(`Exception lors de la promotion automatique de ${user.email}:`, error.message);
          setAutoPromoteStatus(prev => ({
            ...prev,
            [user.email]: `erreur: ${error.message}`
          }));
        }
      }
    };

    // Exécuter la promotion automatique au chargement du composant
    promoteSpecificUsers();
  }, []);

  return (
    <Card className="mb-6">
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-destructive" />
          Promotion Super Utilisateur
        </CardTitle>
        <CardDescription>
          Attribuer des droits spécifiques à un utilisateur existant
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Input
              type="email"
              placeholder="Email de l'utilisateur"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-sm"
            />
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choisir un rôle" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={handlePromoteUser} 
              disabled={loading || !email}
              className="gap-2"
            >
              <UserPlus className="h-4 w-4" />
              {loading ? "Attribution..." : "Attribuer droits"}
            </Button>
          </div>
          
          {/* Statut des promotions automatiques */}
          {Object.keys(autoPromoteStatus).length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">État des promotions automatiques:</h3>
              <div className="text-sm space-y-1">
                {Object.entries(autoPromoteStatus).map(([email, status]) => (
                  <div key={email} className="flex items-center gap-2">
                    <span>{email}:</span>
                    <span className={
                      status === "succès" ? "text-green-600" : 
                      status === "en cours..." ? "text-amber-500" : 
                      "text-red-600"
                    }>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 text-sm text-muted-foreground">
        <p>⚠️ Cette action attribuera des droits spécifiques sur la plateforme</p>
      </CardFooter>
    </Card>
  );
};

export default SuperUserPromotion;
