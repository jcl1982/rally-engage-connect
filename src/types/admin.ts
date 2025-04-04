
// Type for users with their roles
export type UserWithRoles = {
  id: string;
  email: string | null; // Make email nullable to match data
  first_name: string | null;
  last_name: string | null;
  roles: string[];
};
