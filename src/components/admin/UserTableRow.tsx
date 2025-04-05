
import React from "react";
import { UserCog } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { UserWithRoles } from "@/types/admin";

interface UserTableRowProps {
  user: UserWithRoles;
  onRemoveRole: (userId: string, role: string) => Promise<void>;
  onSelectUser: (user: UserWithRoles) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ 
  user, 
  onRemoveRole, 
  onSelectUser 
}) => {
  const { toast } = useToast();

  return (
    <TableRow key={user.id}>
      <TableCell>
        {user.first_name || user.last_name ? 
          `${user.first_name || ''} ${user.last_name || ''}`.trim() : 
          <span className="text-muted-foreground italic">Non renseigné</span>}
      </TableCell>
      <TableCell>{user.email || <span className="text-muted-foreground italic">Email non disponible</span>}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {user.roles.map((role) => (
            <Badge
              key={role}
              variant={
                role === 'admin' 
                  ? 'destructive' 
                  : role === 'organizer' 
                    ? 'outline' 
                    : 'default'
              }
              className="cursor-pointer"
              onClick={() => {
                if (user.roles.length > 1 || role !== 'user') {
                  onRemoveRole(user.id, role);
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
      </TableCell>
      <TableCell>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onSelectUser(user)}
          >
            <UserCog className="h-4 w-4 mr-1" /> 
            Modifier rôles
          </Button>
        </DialogTrigger>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
