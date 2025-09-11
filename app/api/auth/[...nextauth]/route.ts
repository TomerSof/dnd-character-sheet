import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "../../supa-client";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { prompt: "consent select_account", access_type: "offline", response_type: "code" } }
    }),
    
  ],
  callbacks: {
    async signIn({ user, account }) {
      const {
          email,
          name
        } = user;

        const provider = account?.provider || "google";
        const providerAccountId = account?.providerAccountId || null;
        const scope = account?.scope || null;
        const access_token = account?.access_token || null;
        const refresh_token = account?.refresh_token || null;
        const token_type = account?.token_type || null;
        
      try {
        console.log("Upserting google user:", email);
        const { error } = await supabase.from("users").upsert([
          {
            email,
            name,
            provider,
            providerAccountId,
            scope,
            access_token,
            refresh_token,
            token_type,
            last_login: new Date(),
          },
        ]);
        if (error) {
          console.error("Supabase insert error:", error.message);
          return false;
        }
        return true;
      } catch (e) {
        console.error("Failed to upsert user:", e);
        return true;
      }
    },
    async session({ session }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
