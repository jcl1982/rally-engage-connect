
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const UserTableSkeleton: React.FC = () => {
  return (
    <>
      {Array(5).fill(0).map((_, index) => (
        <TableRow key={index}>
          <TableCell><Skeleton className="h-5 w-32" /></TableCell>
          <TableCell><Skeleton className="h-5 w-48" /></TableCell>
          <TableCell>
            <div className="flex flex-wrap gap-1">
              <Skeleton className="h-5 w-14" />
              <Skeleton className="h-5 w-14" />
            </div>
          </TableCell>
          <TableCell><Skeleton className="h-8 w-28" /></TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default UserTableSkeleton;
