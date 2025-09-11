"use client";
import Navbar from "./Navbar";
import HomePage from "./home/HomePage";
import { useSession } from "./contexts/SessionContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/sheet");
    }
  }, [session, router]);

  return (
    <>
      <Navbar />
      <main className="pt-17">{!session && <HomePage />}</main>
    </>
  );
}
