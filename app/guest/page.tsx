"use client";
import Navbar from "../Navbar";
import Sheet from "../sheet/sheet";

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
