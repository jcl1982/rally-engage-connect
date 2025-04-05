
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Car, Calendar, Trophy, Settings, LogOut, Star, Map, Bell, FileText, Loader } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventCard from "@/components/events/EventCard";
import { upcomingEvents } from "@/data/eventsData";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner"; // Import toast from sonner for more consistent notifications

interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  created_at?: string;
  updated_at?: string;
}

const ProfileHeader = ({ profileData }: { profileData: ProfileData | null }) => {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
    toast.success("Déconnexion réussie");
  };
  
  return (
    <div className="bg-gradient-to-b from-rally-orange to-rally-orange/80 text-white py-8 rounded-lg mb-8">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-rally-orange" />
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">
              {profileData ? `${profileData.first_name} ${profileData.last_name}` : 'Chargement...'}
            </h1>
            <p className="opacity-90">
              {profileData ? `Membre depuis ${new Date(profileData.created_at || '').getFullYear()}` : 'Chargement...'}
            </p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
              <Badge className="bg-white/20 hover:bg-white/30">Passionné</Badge>
              <Badge className="bg-white/20 hover:bg-white/30">5 rallyes</Badge>
              <Badge className="bg-white/20 hover:bg-white/30">Alpes</Badge>
            </div>
          </div>
          
          <div className="flex-grow"></div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="border-white text-white hover:bg-white/20">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/20"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, value, label }) => {
  return (
    <Card>
      <CardContent className="pt-6 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
          {icon}
        </div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
};

const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        console.log("Fetching profile data for user:", user.id);
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error('Erreur lors de la récupération du profil:', error);
          toast.error("Impossible de charger les données de profil");
          
          // Try to create a profile if it doesn't exist (this might happen if the profile wasn't created during signup)
          if (error.code === 'PGRST116') { // No rows returned by the query
            console.log("Profile not found, attempting to create one");
            const { user: authUser } = await supabase.auth.getUser();
            
            if (authUser.user) {
              const { error: insertError } = await supabase
                .from('profiles')
                .insert([{ 
                  id: user.id,
                  first_name: authUser.user.user_metadata?.first_name || '',
                  last_name: authUser.user.user_metadata?.last_name || ''
                }]);
                
              if (insertError) {
                console.error('Error creating profile:', insertError);
              } else {
                // Re-fetch the profile after creating it
                const { data: newData } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', user.id)
                  .single();
                  
                setProfileData(newData);
                console.log("Created and fetched new profile:", newData);
              }
            }
          }
        } else {
          console.log("Profile data fetched successfully:", data);
          setProfileData(data);
        }
      } catch (err) {
        console.error('Exception lors de la récupération du profil:', err);
        toast.error("Une erreur s'est produite lors du chargement du profil");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user && !authLoading) {
      fetchProfileData();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-8 flex items-center justify-center">
          <div className="text-center">
            <Loader className="w-12 h-12 animate-spin text-rally-orange mx-auto mb-4" />
            <p className="text-lg">Chargement de votre profil...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container">
          <ProfileHeader profileData={profileData} />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              icon={<Trophy className="w-6 h-6 text-rally-orange" />}
              value="5"
              label="Rallyes terminés"
            />
            <StatsCard 
              icon={<Star className="w-6 h-6 text-rally-orange" />}
              value="2"
              label="Podiums"
            />
            <StatsCard 
              icon={<Map className="w-6 h-6 text-rally-orange" />}
              value="850 km"
              label="Distance parcourue"
            />
            <StatsCard 
              icon={<Calendar className="w-6 h-6 text-rally-orange" />}
              value="2"
              label="Rallyes à venir"
            />
          </div>
          
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-8">
              <TabsTrigger value="upcoming" className="text-base">
                <Calendar className="w-4 h-4 mr-2" />
                Rallyes à venir
              </TabsTrigger>
              <TabsTrigger value="history" className="text-base">
                <Trophy className="w-4 h-4 mr-2" />
                Historique
              </TabsTrigger>
              <TabsTrigger value="vehicles" className="text-base">
                <Car className="w-4 h-4 mr-2" />
                Mes véhicules
              </TabsTrigger>
              <TabsTrigger value="documents" className="text-base">
                <FileText className="w-4 h-4 mr-2" />
                Documents
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.slice(0, 2).map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
                
                <Card className="flex flex-col items-center justify-center p-8 border-dashed">
                  <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Découvrez plus de rallyes</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Trouvez votre prochain défi parmi nos événements
                  </p>
                  <Button asChild>
                    <Link to="/events">Explorer les rallyes</Link>
                  </Button>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Rallye des Alpes 2023</CardTitle>
                        <CardDescription>12-14 mai 2023 • Provence-Alpes-Côte d'Azur</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        2ème place
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Véhicule</p>
                        <p className="font-medium">Alpine A110</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Temps total</p>
                        <p className="font-medium">2h 36m 45s</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Position</p>
                        <p className="font-medium">2ème / 24 participants</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Rallye du Mont-Blanc</CardTitle>
                        <CardDescription>8-10 juillet 2023 • Auvergne-Rhône-Alpes</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        5ème place
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Véhicule</p>
                        <p className="font-medium">Alpine A110</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Temps total</p>
                        <p className="font-medium">3h 12m 18s</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Position</p>
                        <p className="font-medium">5ème / 32 participants</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Rallye des Cévennes</CardTitle>
                        <CardDescription>23-25 septembre 2023 • Occitanie</CardDescription>
                      </div>
                      <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                        Abandonnée
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Véhicule</p>
                        <p className="font-medium">Alpine A110</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Raison</p>
                        <p className="font-medium">Problème mécanique</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Progression</p>
                        <p className="font-medium">65% du parcours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="vehicles">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Alpine A110</CardTitle>
                    <CardDescription>2020 • Utilisation principale</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                        <Car className="w-16 h-16 text-gray-400" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Immatriculation</p>
                          <p className="font-medium">AB-123-CD</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Catégorie</p>
                          <p className="font-medium">Amateur</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Puissance</p>
                          <p className="font-medium">252 ch</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Poids</p>
                          <p className="font-medium">1,102 kg</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">Modifier</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="flex flex-col items-center justify-center p-8 border-dashed">
                  <Car className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Ajouter un véhicule</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Enregistrez un nouveau véhicule pour vos prochains rallyes
                  </p>
                  <Button>Ajouter un véhicule</Button>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="documents">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents personnels</CardTitle>
                    <CardDescription>
                      Tous vos documents pour l'inscription aux rallyes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-accent rounded-md">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-rally-orange" />
                        <div>
                          <p className="font-medium">Licence FFSA</p>
                          <p className="text-sm text-muted-foreground">Ajouté le 15/01/2023 • Expire le 31/12/2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Voir</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-accent rounded-md">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-rally-orange" />
                        <div>
                          <p className="font-medium">Certificat médical</p>
                          <p className="text-sm text-muted-foreground">Ajouté le 10/02/2023 • Expire le 10/02/2024</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Voir</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-accent rounded-md">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-rally-orange" />
                        <div>
                          <p className="font-medium">Permis de conduire</p>
                          <p className="text-sm text-muted-foreground">Ajouté le 05/01/2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Voir</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Documents véhicule</CardTitle>
                    <CardDescription>
                      Documents relatifs à votre véhicule Alpine A110
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-accent rounded-md">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-rally-orange" />
                        <div>
                          <p className="font-medium">Certificat d'immatriculation</p>
                          <p className="text-sm text-muted-foreground">Ajouté le 15/01/2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Voir</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-accent rounded-md">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-rally-orange" />
                        <div>
                          <p className="font-medium">Assurance</p>
                          <p className="text-sm text-muted-foreground">Ajouté le 03/03/2023 • Expire le 03/03/2024</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Voir</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-accent rounded-md">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-rally-orange" />
                        <div>
                          <p className="font-medium">Contrôle technique</p>
                          <p className="text-sm text-muted-foreground">Ajouté le 20/04/2023 • Expire le 20/04/2025</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Voir</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
