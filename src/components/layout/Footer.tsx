
import React from "react";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-asag-dark text-white py-8 mt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-asag-red" />
              <span className="font-bold text-xl">ASA Guadeloupe</span>
            </Link>
            <p className="text-gray-300 max-w-md">
              La plateforme d'engagement pour les rallyes automobiles qui connecte 
              les pilotes aux organisateurs en Guadeloupe.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors">
                  Événements
                </Link>
              </li>
              {/* Removed the /routes link that doesn't exist in App.tsx routes */}
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
                  Mon Profil
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">info@asaguadeloupe.fr</li>
              <li className="text-gray-300">+590 590 XX XX XX</li>
              <li className="text-gray-300">
                97120 Saint-Claude<br />
                Guadeloupe, France
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ASA Guadeloupe. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
