
import React from "react";
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
import { AuthService, PasswordResetFormData } from "@/services/AuthService";

// Define validation schema
const resetSchema = z.object({
  email: z.string().email({ message: "Format d'email invalide" }),
});

type ResetFormValues = z.infer<typeof resetSchema>;

const ForgotPasswordPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const handleReset = async (values: ResetFormValues) => {
    try {
      const { error } = await AuthService.resetPassword(values as PasswordResetFormData);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Email envoyé",
        description: "Si un compte existe avec cet email, vous recevrez un lien pour réinitialiser votre mot de passe.",
      });
      
      // Redirect to login page
      navigate("/login");
    } catch (error: any) {
      console.error("Erreur lors de la réinitialisation du mot de passe:", error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };
  
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
            <CardTitle className="text-2xl font-bold text-center">Mot de passe oublié</CardTitle>
            <CardDescription className="text-center">
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleReset)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="votre@email.com" 
                          autoComplete="email"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-asag-red hover:bg-asag-red/90">
                  Réinitialiser le mot de passe
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              Vous vous souvenez de votre mot de passe?{' '}
              <Link to="/login" className="text-asag-red hover:underline font-medium">
                Retour à la connexion
              </Link>
            </div>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
