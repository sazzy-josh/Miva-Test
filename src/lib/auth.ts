import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";

// Mock users for demonstration
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "password@123",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Test User",
    email: "user@example.com",
    password: "password@123",
    image: "https://ui-avatars.com/api/?name=Test+User",
  },
];

export const {handlers, auth, signIn, signOut} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        // Validate credentials format
        const parsedCredentials = z
          .object({email: z.string().email(), password: z.string().min(6)})
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new Error("Invalid credentials format");
        }

        const {email, password} = parsedCredentials.data;
        const user = users.find((user) => user.email === email);

        // User not found
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // In a real app, you'd compare hashed passwords
        const passwordsMatch = user.password === password;

        if (passwordsMatch) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }

        // Password doesn't match
        throw new Error("Invalid email or password");
      },
    }),
  ],
  callbacks: {
    authorized({auth, request: {nextUrl}}) {
      const isLoggedIn = !!auth?.user;
      const isProtected =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/students") ||
        nextUrl.pathname.startsWith("/courses");

      if (isProtected && !isLoggedIn) {
        return false; // Redirect to login
      }

      return true;
    },
    jwt({token, user}) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({session, token}) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
