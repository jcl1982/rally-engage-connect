
import React from "react";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-rally-dark text-white py-8 mt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-rally-orange" />
              <span className="font-bold text-xl">RallyConnect</span>
            </Link>
            <p className="text-gray-300 max-w-md">
              La plateforme d'engagement pour les rallyes automobiles qui connecte 
              les pilotes aux organisateurs.
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
              <li>
                <Link to="/routes" className="text-gray-300 hover:text-white transition-colors">
                  Itinéraires
                </Link>
              </li>
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
              <li className="text-gray-300">info@rallyconnect.fr</li>
              <li className="text-gray-300">+33 (0)1 23 45 67 89</li>
              <li className="text-gray-300">
                123 Avenue des Rallyes<br />
                75001 Paris, France
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} RallyConnect. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
