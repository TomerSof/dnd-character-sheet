import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supa-client";


export async function POST(req: NextRequest) {
  const body = await req.json();
  const { user_id, character } = body;

  const { error } = await supabase.from("characters").upsert({
    user_id,
    character,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: "Character saved!" });
}
