import { supabase } from "../supa-client";

interface RegisterData {
  email: string;
  password: string;
  fullName?: string;
}

/**
 * Manual registration with email/password
 */
export async function manualRegister({ email, password, fullName }: RegisterData) {
  // 1️⃣ Sign up user in Supabase Auth
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName } },
  });

  if (signUpError) throw new Error(signUpError.message);
  if (!signUpData.user) throw new Error("User registration failed.");

  const user = signUpData.user;

  // 2️⃣ Sign in user immediately to create session
  const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (sessionError) throw new Error(sessionError.message);

  // 3️⃣ Upsert into users_meta
  const { error: metaError } = await supabase.from("users_meta").upsert({
    id: user.id,
    name: fullName || user.user_metadata.full_name || "",
    email: user.email,
  });

  if (metaError) throw new Error(metaError.message);

  return { user, session: sessionData.session };
}

/**
 * Post-OAuth registration (e.g., Google) after redirect
 */
export async function postOAuthRegister() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  if (!session) return null;

  const user = session.user;

  // Upsert into users_meta
  const { error: metaError } = await supabase.from("users_meta").upsert({
    id: user.id,
    name: user.user_metadata.full_name || "",
    email: user.email,
  });

  if (metaError) throw new Error(metaError.message);

  return { user, session };
}
