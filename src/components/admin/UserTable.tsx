
import React from "react";
import { UserCog } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { UserWithRoles } from "@/types/admin";

interface UserTableProps {
  users: UserWithRoles[];
  onRemoveRole: (userId: string, role: string) => Promise<void>;
  onSelectUser: (user: UserWithRoles) => void;
  loading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onRemoveRole,
  onSelectUser,
  loading
}) => {
  const { toast } = useToast();

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Utilisateur</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôles</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((role) => (
                      <Badge
                        key={role}
                        variant={role === 'admin' ? 'destructive' : role === 'organizer' ? 'outline' : 'default'}
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
                  <Dialog>
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
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                Aucun utilisateur trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
