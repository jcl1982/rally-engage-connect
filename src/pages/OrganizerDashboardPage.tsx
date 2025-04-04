
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DashboardHeader from "@/components/organizer/DashboardHeader";
import DashboardStats from "@/components/organizer/DashboardStats";
import EventsTabs from "@/components/organizer/EventsTabs";
import ActionLinks from "@/components/organizer/ActionLinks";
import RecentRegistrations from "@/components/organizer/RecentRegistrations";
import { useOrganizerEvents } from "@/hooks/useOrganizerEvents";

const OrganizerDashboardPage = () => {
  const { events, stats, loading } = useOrganizerEvents();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container max-w-7xl">
          <DashboardHeader />
          <DashboardStats stats={stats} />
          <EventsTabs events={events} loading={loading} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ActionLinks />
            <RecentRegistrations loading={loading} eventTitle={events[0]?.title} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrganizerDashboardPage;
