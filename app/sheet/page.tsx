"use client";
import Navbar from "../Navbar";
import Sheet from "./sheet";

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
