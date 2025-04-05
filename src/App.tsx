
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
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import AuthWrapper from "./components/auth/AuthWrapper";

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
            {/* Routes publiques */}
            <Route path="/" element={<Index />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/events/:id/register" element={<RegistrationPage />} />
            
            {/* Routes d'authentification */}
            <Route 
              path="/login" 
              element={
                <AuthWrapper requireAuth={false} redirectTo="/">
                  <LoginPage />
                </AuthWrapper>
              }
            />
            <Route 
              path="/register" 
              element={
                <AuthWrapper requireAuth={false} redirectTo="/">
                  <RegisterPage />
                </AuthWrapper>
              }
            />
            <Route 
              path="/forgot-password" 
              element={
                <AuthWrapper requireAuth={false} redirectTo="/">
                  <ForgotPasswordPage />
                </AuthWrapper>
              }
            />
            <Route path="/auth/new-password" element={<NewPasswordPage />} />
            
            {/* Routes protégées pour utilisateurs connectés */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
