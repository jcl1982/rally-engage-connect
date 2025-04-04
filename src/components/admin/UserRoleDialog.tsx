
import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";
import { UserWithRoles } from "@/types/admin";
import { ShieldCheck, ShieldAlert, User } from "lucide-react";

// Define the type for user roles
type UserRole = Database["public"]["Enums"]["app_role"];

// Type guard function to check if a string is a valid UserRole
function isValidUserRole(role: string): role is UserRole {
  return role === 'user' || role === 'organizer' || role === 'admin';
}

// Role information for display
const roleInfo = {
  user: {
    title: 'Utilisateur',
    description: 'Accès standard aux fonctionnalités du site',
    icon: User,
    color: 'bg-blue-100 text-blue-800',
  },
  organizer: {
    title: 'Organisateur',
    description: 'Peut créer et gérer des événements',
    icon: ShieldCheck,
    color: 'bg-amber-100 text-amber-800',
  },
  admin: {
    title: 'Administrateur',
    description: 'Accès complet à toutes les fonctionnalités',
    icon: ShieldAlert,
    color: 'bg-red-100 text-red-800',
  }
};

interface UserRoleDialogProps {
  selectedUser: UserWithRoles | null;
  onAssignRole: (userId: string, role: UserRole) => Promise<void>;
  onRemoveRole: (userId: string, role: string) => Promise<void>;
}

const UserRoleDialog: React.FC<UserRoleDialogProps> = ({
  selectedUser,
  onAssignRole,
  onRemoveRole
}) => {
  const { toast } = useToast();

  if (!selectedUser) return null;

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="text-xl">
          Gestion des rôles de {selectedUser.first_name || ''} {selectedUser.last_name || ''}
        </DialogTitle>
        <DialogDescription>
          Ajouter ou retirer des rôles pour cet utilisateur.
          {selectedUser.email && <p className="mt-1 font-medium">{selectedUser.email}</p>}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6 py-4">
        <div className="space-y-3">
          <h4 className="font-medium text-lg">Rôles actuels</h4>
          <div className="flex flex-wrap gap-2">
            {selectedUser.roles.length > 0 ? (
              selectedUser.roles.map((role) => (
                <Badge
                  key={role}
                  variant={role === 'admin' ? 'destructive' : role === 'organizer' ? 'outline' : 'default'}
                  className="cursor-pointer text-sm px-3 py-1.5 flex items-center gap-1"
                  onClick={() => {
                    if (selectedUser.roles.length > 1 || role !== 'user') {
                      onRemoveRole(selectedUser.id, role);
                    } else {
                      toast({
                        title: "Information",
                        description: "Impossible de retirer le rôle 'user' de base.",
                      });
                    }
                  }}
                >
                  {React.createElement(roleInfo[role as keyof typeof roleInfo]?.icon || User, { className: "h-3 w-3" })}
                  {roleInfo[role as keyof typeof roleInfo]?.title || role} ×
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground italic">Aucun rôle attribué</p>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium text-lg">Attribuer un nouveau rôle</h4>
          <div className="flex gap-2">
            <Select
              onValueChange={(value) => {
                if (isValidUserRole(value)) {
                  onAssignRole(selectedUser.id, value);
                }
              }}
            >
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Choisir un rôle" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(roleInfo).map(([role, info]) => (
                  <SelectItem 
                    key={role} 
                    value={role}
                    disabled={selectedUser.roles.includes(role)}
                  >
                    <div className="flex items-center gap-2">
                      {React.createElement(info.icon, { className: "h-4 w-4" })}
                      <div className="flex flex-col">
                        <span>{info.title}</span>
                        <span className="text-xs text-muted-foreground">{info.description}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border p-4 bg-muted/30">
          <h4 className="font-medium mb-2">Description des rôles</h4>
          <div className="space-y-2">
            {Object.entries(roleInfo).map(([role, info]) => (
              <div key={role} className="flex items-center gap-2">
                {React.createElement(info.icon, { className: "h-4 w-4" })}
                <span className="font-medium">{info.title}:</span>
                <span className="text-sm">{info.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default UserRoleDialog;
