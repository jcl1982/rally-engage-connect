
import React from "react";
import DashboardHeader from "@/components/organizer/DashboardHeader";
import DashboardStats from "@/components/organizer/DashboardStats";
import EventsTabs from "@/components/organizer/EventsTabs";
import RecentRegistrations from "@/components/organizer/RecentRegistrations";
import { useOrganizerEvents } from "@/hooks/useOrganizerEvents";

const OrganizerDashboardPage = () => {
  const { events, stats, loading } = useOrganizerEvents();
  
  return (
    <>
      <DashboardHeader />
      <DashboardStats stats={stats} />
      <EventsTabs events={events} loading={loading} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <RecentRegistrations loading={loading} eventTitle={events[0]?.title} />
      </div>
    </>
  );
};

export default OrganizerDashboardPage;
