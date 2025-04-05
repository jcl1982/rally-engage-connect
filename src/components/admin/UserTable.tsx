import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { UserWithRoles } from "@/types/admin";
import Pagination from "./Pagination";
import UserTableRow from "./UserTableRow";
import UserTableSkeleton from "./UserTableSkeleton";

interface UserTableProps {
  users: UserWithRoles[];
  onRemoveRole: (userId: string, role: string) => Promise<void>;
  onSelectUser: (user: UserWithRoles) => void;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onRemoveRole,
  onSelectUser,
  loading,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Loading skeleton for the table
  if (loading) {
    return (
      <div className="space-y-3">
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
            <UserTableSkeleton />
          </TableBody>
        </Table>
        
        <div className="mt-4">
          <Skeleton className="h-8 w-full max-w-md mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
                <UserTableRow 
                  key={user.id} 
                  user={user} 
                  onRemoveRole={onRemoveRole} 
                  onSelectUser={onSelectUser} 
                />
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
      
      {/* Pagination */}
      {users.length > 0 && totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={onPageChange} 
        />
      )}

      {/* We keep the dialog here to maintain context but it doesn't render anything */}
      <Dialog />
    </div>
  );
};

export default UserTable;
