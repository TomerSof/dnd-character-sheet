"use client";
import Navbar from "./Navbar";
import HomePage from "./home/HomePage";
import { useSession } from "./contexts/SessionContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { session, setSession } = useSession();
  const [guest, setGuest] = useState(false);
  const router = useRouter();


  useEffect(() => {
    // If the user is logged in, send them straight to /sheet
    if (session) {
      router.replace("/sheet");
    }
  }, [session, router]);

  return (
    <>
      <Navbar />
      <main className="pt-17">
        {!session && <HomePage />}
      </main>
    </>
  );
}
