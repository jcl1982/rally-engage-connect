
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

// Define the type for user roles
type UserRole = Database["public"]["Enums"]["app_role"];

// Type guard function to check if a string is a valid UserRole
function isValidUserRole(role: string): role is UserRole {
  return role === 'user' || role === 'organizer' || role === 'admin';
}

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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Gérer les rôles de {selectedUser.first_name} {selectedUser.last_name}
        </DialogTitle>
        <DialogDescription>
          Ajouter ou retirer des rôles pour cet utilisateur.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <h4 className="font-medium">Rôles actuels:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedUser.roles.map((role) => (
              <Badge
                key={role}
                variant={role === 'admin' ? 'destructive' : role === 'organizer' ? 'outline' : 'default'}
                className="cursor-pointer"
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
                {role} ×
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">Ajouter un rôle:</h4>
          <div className="flex gap-2">
            <Select
              onValueChange={(value) => {
                // Make sure the value is a valid UserRole before passing it to assignRole
                if (isValidUserRole(value)) {
                  onAssignRole(selectedUser.id, value);
                }
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Choisir un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Utilisateur</SelectItem>
                <SelectItem value="organizer">Organisateur</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default UserRoleDialog;
