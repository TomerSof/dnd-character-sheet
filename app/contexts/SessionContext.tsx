// contexts/SessionContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../api/supa-client";

interface FlattenedUser {
  id: string;
  email: string | null;
  fullName: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface CustomSession {
  user: FlattenedUser;
  access_token: string;
  expires_at: number;
}

interface SessionContextType {
  session: CustomSession | null;
  setSession: (session: CustomSession | null) => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<CustomSession | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(flattenUser(data.session));
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(flattenUser(session));
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const flattenUser = (s: Session | null): CustomSession | null => {
    if (!s || !s.user) return null;

    const user: FlattenedUser = {
      id: s.user.id,
      email: s.user.email,
      fullName: s.user.user_metadata?.full_name || "",
      firstName: s.user.user_metadata?.full_name?.split(" ")[0] || "",
      lastName:
        s.user.user_metadata?.full_name?.split(" ").slice(1).join(" ") || "",
      avatar: s.user.user_metadata?.avatar_url || "",
    };

    return {
      user,
      access_token: s.access_token,
      expires_at: s.expires_at,
    };
  };

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

// Proper useSession hook
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
export default SessionContext;
