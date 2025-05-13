export interface User {
  userId: number;
  name: string;
  email: string;
  profile: string;
  company?: string;
  role: "Admin" | "User";
}
