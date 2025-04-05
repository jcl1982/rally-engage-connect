
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import LoginHeader from "@/components/auth/LoginHeader";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/50 py-12 px-4">
      <div className="w-full max-w-md">
        <LoginHeader />
        
        <Card>
          <CardHeader className="space-y-1">
            <LoginHeader />
          </CardHeader>
          
          <CardContent>
            <LoginForm />
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Ou continuer avec
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <SocialLogin />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              Pas encore de compte?{' '}
              <Link to="/register" className="text-asag-red hover:underline font-medium">
                S'inscrire
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

export default LoginPage;
