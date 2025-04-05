
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  className: string;
}

const StatCard = ({ title, value, icon, className }: StatCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${className}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
