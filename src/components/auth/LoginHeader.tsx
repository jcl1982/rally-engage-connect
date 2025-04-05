
import React from "react";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";

const LoginHeader = () => {
  return (
    <>
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-2">
          <Trophy className="w-8 h-8 text-asag-red" />
          <span className="font-bold text-2xl">ASA Guadeloupe</span>
        </Link>
      </div>
      
      <CardTitle className="text-2xl font-bold text-center">Connexion</CardTitle>
      <CardDescription className="text-center">
        Connectez-vous à votre compte ASA Guadeloupe
      </CardDescription>
    </>
  );
};

export default LoginHeader;
