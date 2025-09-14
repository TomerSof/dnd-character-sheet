"use client";
import Navbar from "../navbar/Navbar";
import Sheet from "./Sheet";

export default function SheetPage() {
  return (
    <>
      <Navbar />
      <main className="pt-17">
        <Sheet guestMode={false} />
      </main>
    </>
  );
}
