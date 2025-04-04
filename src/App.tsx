
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import OrganizerRoute from "./components/auth/OrganizerRoute";
import AdminRoute from "./components/auth/AdminRoute";
import OrganizerDashboardPage from "./pages/OrganizerDashboardPage";
import EventManagementPage from "./pages/EventManagementPage";
import OrganizerParticipantsPage from "./pages/OrganizerParticipantsPage";
import OrganizerSettingsPage from "./pages/OrganizerSettingsPage";
import AdminPage from "./pages/AdminPage";
import OrganizerLayout from "./components/organizer/OrganizerLayout";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/events/:id/register" element={<RegistrationPage />} />
            
            {/* Routes protégées pour utilisateurs connectés */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            
            {/* Routes protégées pour organisateurs avec le nouveau layout */}
            <Route element={<OrganizerRoute />}>
              <Route element={<OrganizerLayout />}>
                <Route path="/organizer" element={<OrganizerDashboardPage />} />
                <Route path="/organizer/events" element={<EventManagementPage />} />
                <Route path="/organizer/participants" element={<OrganizerParticipantsPage />} />
                <Route path="/organizer/settings" element={<OrganizerSettingsPage />} />
              </Route>
            </Route>
            
            {/* Routes protégées pour administrateurs */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
