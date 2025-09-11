"use client";
import Link from "next/link";
import { useRef } from "react";

export default function HomePage() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <main className="min-h-screen bg-gray-900 text-white bg-[url('/cover.webp')] bg-cover flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-screen md:h-[80vh] flex items-center justify-center  bg-center">
        {/* Overlay */}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center bg-gray-900/50 rounded-lg p-5">
          <h1 className="text-4xl md:text-5xl font-bold font-fantasy">
            🛡️ D&D Character Sheet
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            Welcome to your personal Dungeons & Dragons character management
            site.
            <br />
            Here you can create, view and manage your D&D characters with ease.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link
              href="/registration"
              className="btn btn-primary text-primary-content font-semibold py-3 px-6 rounded-lg transition"
            >
              Register Now
            </Link>

            <button
              className="btn btn-secondary text-primary-content font-semibold py-3 px-6 rounded-lg transition"
              onClick={() => dialogRef.current?.showModal()}
            >
              Continue As Guest
            </button>

            <dialog
              ref={dialogRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box flex align-center flex-col">
                <h3 className="font-bold text-lg underline">Important note!</h3>
                <p className="py-4">
                  If you choose to continue as a guest, your character will not
                  be saved.
                </p>
                <div className="modal-action">
                  <form
                    method="dialog"
                    className="flex gap-4 justify-around w-full"
                  >
                    <button className="btn btn-error">Close</button>
                    <Link className="btn btn-primary" href="/guest">
                      Continue as Guest
                    </Link>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-white-500 text-sm">
        &copy; {new Date().getFullYear()} D&D Character Sheet. All rights
        reserved.
      </footer>
    </main>
  );
}
