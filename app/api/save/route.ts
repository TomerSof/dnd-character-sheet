import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supa-client";


export async function POST(req: NextRequest) {
  const body = await req.json();
  const { user_id, character } = body;

  const { error } = await supabase
  .from("characters")
  .upsert(
    [
      { id: character.id, user_id, ...character } // flatten character if columns exist
    ],
    { onConflict: "id" }
  )
  .select()
  .single();


  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: "Character saved!" });
}
