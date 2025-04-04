
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { OrganizerSidebar } from "@/components/organizer/OrganizerSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const OrganizerLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <OrganizerSidebar />
        <SidebarInset>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow py-8">
              <div className="container max-w-7xl">
                <Outlet />
              </div>
            </main>
            <Footer />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default OrganizerLayout;
