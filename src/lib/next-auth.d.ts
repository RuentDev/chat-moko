import "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    phone: string;
    image: string;
    name: string;
    username: string;
    emailVerified: string;
    first_name: string
    middle_name: string
    last_name: string

  }
}
