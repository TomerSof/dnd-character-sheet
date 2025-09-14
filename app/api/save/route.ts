import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supa-client";


export async function POST(req: NextRequest) {
  const body = await req.json();
  const { characterId ,user_id, character } = body;

  const { data, error } = await supabase
  .from("characters")
  .upsert(
    characterId
    ? [{ id: characterId, user_id, character }]
    : [{ user_id, character }],
    { onConflict: "id" }
  )
  .select()
  .single();


  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: "Character saved!", id: data.id }, { status: 200 });
}
