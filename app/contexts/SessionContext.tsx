"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../api/supa-client";
import { Session } from "@supabase/supabase-js";

export interface FlattenedUser {
  id: string;
  email: string | null;
  fullName: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface CustomSession {
  user: FlattenedUser;
  access_token: string;
  expires_at: number | undefined;
  activeCharacterId?: string;
}

interface SessionContextType {
  session: CustomSession | null;
  chosenTheme: string | null;
  loading: boolean;
  setSession: React.Dispatch<React.SetStateAction<CustomSession | null>>;
  setChosenTheme: (theme: string) => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

// Flatten Supabase session into CustomSession
export const flattenUser = (s: Session | null): CustomSession | null => {
  if (!s || !s.user) return null;

  const user: FlattenedUser = {
    id: s.user.id,
    email: s.user.email ?? null,
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

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<CustomSession | null>(null);
  const [chosenTheme, setChosenTheme] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThemeForUser = async (userId: string) => {
      const { data, error } = await supabase
        .from("users_meta")
        .select("default_theme")
        .eq("id", userId)
        .single();

      if (!error && data?.default_theme) {
        setChosenTheme(data.default_theme);
      }
    };

    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const flat = flattenUser(data.session);
        setSession(flat);
        await fetchThemeForUser(data.session.user.id);
      }
      setLoading(false);
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, s) => {
        const flat = flattenUser(s);
        setSession(flat);
        if (s?.user?.id) await fetchThemeForUser(s.user.id);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (chosenTheme)
      document.documentElement.setAttribute("data-theme", chosenTheme);
  }, [chosenTheme]);

  return (
    <SessionContext.Provider
      value={{ session, setSession, chosenTheme, setChosenTheme, loading }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error("useSession must be used within a SessionProvider");
  return context;
};

export default SessionContext;
