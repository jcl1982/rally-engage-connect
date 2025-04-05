
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trophy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AuthService, NewPasswordFormData } from "@/services/AuthService";

// Define validation schema
const passwordSchema = z.object({
  password: z.string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const NewPasswordPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isValidUrl, setIsValidUrl] = useState(false);
  
  useEffect(() => {
    // Check if the URL contains hash parameters from Supabase
    const hash = window.location.hash;
    if (hash && (hash.includes('type=recovery') || hash.includes('type=signup'))) {
      setIsValidUrl(true);
    } else {
      toast({
        title: "Lien invalide",
        description: "Ce lien de réinitialisation est invalide ou expiré.",
        variant: "destructive",
      });
    }
  }, [toast]);
  
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  
  const handlePasswordUpdate = async (values: PasswordFormValues) => {
    try {
      const { error } = await AuthService.updatePassword({
        password: values.password
      } as NewPasswordFormData);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été mis à jour avec succès.",
      });
      
      // Redirect to login page
      navigate("/login");
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
      toast({
        title: "Erreur",
        description: error.message || "Un problème est survenu lors de la mise à jour du mot de passe.",
        variant: "destructive",
      });
    }
  };
  
  if (!isValidUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent/50 py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Lien invalide</CardTitle>
            <CardDescription className="text-center">
              Ce lien de réinitialisation est invalide ou a expiré.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Link to="/forgot-password">
              <Button>Demander un nouveau lien</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Trophy className="w-8 h-8 text-asag-red" />
            <span className="font-bold text-2xl">ASA Guadeloupe</span>
          </Link>
        </div>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Nouveau mot de passe</CardTitle>
            <CardDescription className="text-center">
              Veuillez définir votre nouveau mot de passe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handlePasswordUpdate)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nouveau mot de passe</FormLabel>
                      <FormControl>
                        <Input 
                          type="password"
                          autoComplete="new-password"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmer le mot de passe</FormLabel>
                      <FormControl>
                        <Input 
                          type="password"
                          autoComplete="new-password"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-asag-red hover:bg-asag-red/90">
                  Définir le mot de passe
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewPasswordPage;
