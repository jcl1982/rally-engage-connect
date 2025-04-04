
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { CalendarClock, LayoutDashboard, Users, Settings } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton, 
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const OrganizerSidebar = () => {
  const { user, signOut } = useAuth();
  const { refreshRoles } = useUserRole();
  const location = useLocation();

  // Définition des liens de navigation
  const navItems = [
    {
      title: "Tableau de bord",
      icon: LayoutDashboard,
      path: "/organizer",
      description: "Vue d'ensemble de vos événements"
    },
    {
      title: "Événements",
      icon: CalendarClock,
      path: "/organizer/events",
      description: "Gérer vos événements"
    },
    {
      title: "Participants",
      icon: Users,
      path: "/organizer/participants",
      description: "Gérer les inscriptions"
    },
    {
      title: "Paramètres",
      icon: Settings,
      path: "/organizer/settings",
      description: "Configuration de votre espace"
    }
  ];

  // Détermine si un lien est actif
  const isActive = (path: string) => {
    if (path === '/organizer' && location.pathname === '/organizer') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/organizer';
  };

  // Extrait les initiales du nom d'utilisateur pour l'avatar
  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="border-b border-border pb-2">
        <div className="flex items-center px-2 py-1">
          <img 
            src="/lovable-uploads/27367e6e-c746-4f09-b941-9fe5dcaa7b35.png" 
            alt="ASA Guadeloupe Logo" 
            className="h-8 w-8 mr-2" 
          />
          <div className="flex flex-col">
            <span className="font-semibold text-asag-red">Espace Organisateur</span>
            <span className="text-xs text-muted-foreground truncate">ASA Guadeloupe</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border pt-2">
        <div className="px-2 py-2">
          <div className="flex items-center gap-2 mb-2">
            <Avatar>
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="font-medium text-sm">{user?.email}</span>
              <span className="text-xs text-muted-foreground truncate">Organisateur</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={signOut}
          >
            Se déconnecter
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default OrganizerSidebar;
