
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Car, MapPin, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isMobile?: boolean;
}

const NavItem = ({ to, icon, label, isMobile = false }: NavItemProps) => {
  const baseClasses = "flex items-center gap-2 font-medium transition-colors";
  const desktopClasses = "hover:text-rally-orange";
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
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1">
            <Trophy className="w-6 h-6 text-rally-orange" />
            <span className="font-bold text-lg">RallyConnect</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavItem to="/" icon={<Trophy className="w-5 h-5" />} label="Événements" />
          <NavItem to="/events" icon={<Car className="w-5 h-5" />} label="Mon Rallye" />
          <NavItem to="/routes" icon={<MapPin className="w-5 h-5" />} label="Itinéraires" />
          <NavItem to="/profile" icon={<User className="w-5 h-5" />} label="Profil" />
        </nav>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/login">Connexion</Link>
          </Button>
          <Button className="bg-rally-orange hover:bg-rally-orange/90" asChild>
            <Link to="/register">Inscription</Link>
          </Button>
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
              <NavItem to="/" icon={<Trophy className="w-5 h-5" />} label="Événements" isMobile />
              <NavItem to="/events" icon={<Car className="w-5 h-5" />} label="Mon Rallye" isMobile />
              <NavItem to="/routes" icon={<MapPin className="w-5 h-5" />} label="Itinéraires" isMobile />
              <NavItem to="/profile" icon={<User className="w-5 h-5" />} label="Profil" isMobile />
            </nav>
            <div className="flex flex-col gap-2 mt-8">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login">Connexion</Link>
              </Button>
              <Button className="bg-rally-orange hover:bg-rally-orange/90 w-full" asChild>
                <Link to="/register">Inscription</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
