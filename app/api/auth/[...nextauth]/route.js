// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "../../../../lib/db";  // Update this path
import { verify } from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const db = await connectToDB();
          const usersCollection = db.collection("users");
          
          const user = await usersCollection.findOne({
            username: credentials.username,
          });
          
          if (!user) {
            throw new Error("No user found with this username");
          }
          
          const isValid = await verify(credentials.password, user.password);
          
          if (!isValid) {
            throw new Error("Invalid password");
          }
          
          return { 
            id: user._id.toString(), 
            name: user.username, 
            role: user.role 
          };
        } catch (error) {
          console.error('Authorization error:', error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);