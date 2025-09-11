import { supabase } from "../../supa-client";

interface RegisterData {
  email: string;
  password: string;
  fullName?: string;
}

/**
 * Manual registration with email/password
 */
 async function manualRegister({ email, password, fullName }: RegisterData) {
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


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await manualRegister(body);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

