
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AuthService, AuthFormData } from "@/services/AuthService";

// Define validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Format d'email invalide" }),
  password: z.string().min(1, { message: "Veuillez entrer votre mot de passe" }),
  remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { toast } = useToast();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
  
  const handleLogin = async (values: LoginFormValues) => {
    try {
      const { error } = await AuthService.login(values as AuthFormData);
      
      if (error) {
        throw error;
      }
      
      // Navigation is handled by auth state change in AuthContext
    } catch (error: any) {
      console.error("Erreur lors de la connexion:", error);
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <FormLabel>Mot de passe</FormLabel>
                <Link to="/forgot-password" className="text-sm text-asag-red hover:underline">
                  Mot de passe oublié?
                </Link>
              </div>
              <FormControl>
                <Input 
                  type="password" 
                  autoComplete="current-password"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                Se souvenir de moi
              </FormLabel>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full bg-asag-red hover:bg-asag-red/90">
          Se connecter
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
