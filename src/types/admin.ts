
// Type for users with their roles
export type UserWithRoles = {
  id: string;
  email: string | null; // Make email nullable to match data
  first_name: string | null;
  last_name: string | null;
  roles: string[];
};

// Role definition with display properties
export type RoleInfo = {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
};

export type RolesInfo = {
  [key: string]: RoleInfo;
};
