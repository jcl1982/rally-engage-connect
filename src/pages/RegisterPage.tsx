
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { AuthService, RegisterFormData } from "@/services/AuthService";
import { supabase } from "@/integrations/supabase/client";

// Define validation schema
const registerSchema = z
  .object({
    firstname: z.string().min(1, "Prénom requis"),
    lastname: z.string().min(1, "Nom requis"),
    email: z.string().email("Format d'email invalide"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: "Veuillez accepter les conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const { toast } = useToast();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false as true, // Using type assertion to satisfy TypeScript
      // The actual validation happens with the Zod schema
    },
  });
  
  const handleRegister = async (values: RegisterFormValues) => {
    try {
      const { data, error } = await AuthService.register({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Inscription réussie",
        description: "Un email de confirmation a été envoyé à votre adresse.",
      });
      
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      let errorMessage = "Une erreur est survenue lors de l'inscription.";
      
      if (error.message.includes("Email already registered")) {
        errorMessage = "Cet email est déjà utilisé. Veuillez vous connecter.";
      }
      
      toast({
        title: "Erreur d'inscription",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };
  
  const handleSocialSignup = async (provider: 'google' | 'facebook') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error(`Erreur lors de l'inscription avec ${provider}:`, error);
      toast({
        title: "Erreur d'inscription",
        description: `Une erreur est survenue lors de l'inscription avec ${provider}. Veuillez réessayer.`,
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
            <CardTitle className="text-2xl font-bold text-center">Créer un compte</CardTitle>
            <CardDescription className="text-center">
              Inscrivez-vous pour accéder aux événements ASA Guadeloupe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
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
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
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
                      <FormLabel>Confirmez le mot de passe</FormLabel>
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
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          J'accepte les{" "}
                          <Link to="/terms" className="text-asag-red hover:underline">
                            conditions générales
                          </Link>{" "}
                          et la{" "}
                          <Link to="/privacy" className="text-asag-red hover:underline">
                            politique de confidentialité
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-asag-red hover:bg-asag-red/90">
                  S'inscrire
                </Button>
              </form>
            </Form>
            
            {/* Social sign up buttons removed for brevity - could be refactored into a separate component */}
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              Déjà inscrit?{" "}
              <Link to="/login" className="text-asag-red hover:underline font-medium">
                Se connecter
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

export default RegisterPage;
