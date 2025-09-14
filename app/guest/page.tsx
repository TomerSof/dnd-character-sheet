"use client";
import Navbar from "../navbar/Navbar";
import Sheet from "../sheet/Sheet";

export default function GuestPage() {
  return (
    <>
      <Navbar />
      <main className="pt-17">
        <Sheet guestMode={true} />
      </main>
    </>
  );
}
