import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error(
    "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variables"
  );
}

if (!process.env.ALLOWED_EMAILS) throw new Error("Missing ALLOWED_EMAILS");
const allowedEmails = process.env.ALLOWED_EMAILS?.split(",");

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ user }) => {
      const email = user.email;
      if (!email) return false;

      // Only allow users in our known users list to sign in.
      if (!allowedEmails.includes(email)) {
        return false;
      }

      return true;
    },
    async session({ session }) {
      // Add property to session, like an access_token from a provider.
      return session;
    },
  },
};
