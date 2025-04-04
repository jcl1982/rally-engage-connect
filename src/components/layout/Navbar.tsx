
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Car, User, Menu, LogOut, LayoutDashboard } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useUserRole } from "@/hooks/useUserRole";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isMobile?: boolean;
}

const NavItem = ({ to, icon, label, isMobile = false }: NavItemProps) => {
  const baseClasses = "flex items-center gap-2 font-medium transition-colors";
  const desktopClasses = "hover:text-asag-red";
  const mobileClasses = "p-3 hover:bg-accent rounded-md w-full";

  return (
    <Link
      to={to}
      className={cn(
        baseClasses,
        isMobile ? mobileClasses : desktopClasses
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { isOrganizer, loading: roleLoading } = useUserRole();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1">
            <Trophy className="w-6 h-6 text-asag-red" />
            <span className="font-bold text-lg">ASA Guadeloupe</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavItem to="/" icon={<Trophy className="w-5 h-5" />} label="Accueil" />
          <NavItem to="/events" icon={<Car className="w-5 h-5" />} label="Événements" />
          {user && (
            <NavItem to="/profile" icon={<User className="w-5 h-5" />} label="Profil" />
          )}
          {user && !roleLoading && isOrganizer() && (
            <NavItem to="/organizer" icon={<LayoutDashboard className="w-5 h-5" />} label="Organisateur" />
          )}
        </nav>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">Connexion</Link>
              </Button>
              <Button className="bg-asag-red hover:bg-asag-red/90 text-white" asChild>
                <Link to="/register">Inscription</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              <NavItem to="/" icon={<Trophy className="w-5 h-5" />} label="Accueil" isMobile />
              <NavItem to="/events" icon={<Car className="w-5 h-5" />} label="Événements" isMobile />
              {user && (
                <NavItem to="/profile" icon={<User className="w-5 h-5" />} label="Profil" isMobile />
              )}
              {user && !roleLoading && isOrganizer() && (
                <NavItem to="/organizer" icon={<LayoutDashboard className="w-5 h-5" />} label="Organisateur" isMobile />
              )}
            </nav>
            <div className="flex flex-col gap-2 mt-8">
              {user ? (
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login">Connexion</Link>
                  </Button>
                  <Button className="bg-asag-red hover:bg-asag-red/90 text-white w-full" asChild>
                    <Link to="/register">Inscription</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
