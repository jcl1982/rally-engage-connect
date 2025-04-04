
import React from "react";
import { Calendar, Users, Car } from "lucide-react";
import StatCard from "./StatCard";

interface DashboardStatsProps {
  stats: {
    eventsCount: number;
    participantsCount: number;
    vehiclesCount: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <StatCard
      title="Événements"
      value={stats.eventsCount}
      icon={<Calendar className="w-6 h-6 text-blue-600" />}
      className="bg-blue-50"
    />
    <StatCard
      title="Participants"
      value={stats.participantsCount}
      icon={<Users className="w-6 h-6 text-green-600" />}
      className="bg-green-50"
    />
    <StatCard
      title="Véhicules enregistrés"
      value={stats.vehiclesCount}
      icon={<Car className="w-6 h-6 text-orange-600" />}
      className="bg-orange-50"
    />
  </div>
);

export default DashboardStats;
