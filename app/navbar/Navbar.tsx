"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../contexts/SessionContext";
import { supabase } from "../api/supa-client";
import ThemeController from "../ThemeController";
import CharactersModal from "./CharactersModal";
import { useCharacter } from "../contexts/CharacterContext";

export default function Navbar() {
  const router = useRouter();
  const { session, setSession } = useSession();
  const [isCharactersModalOpen, setIsCharactersModalOpen] = useState(false);
  const { resetCharacter, setIsSavedCharacter } = useCharacter();

  const handleNewCharacter = () => {
    setIsSavedCharacter(false);
    resetCharacter();
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      return;
    }
    setSession(null);
    router.push("/");
  };

  return (
    <div className="navbar z-10 bg-primary/80 shadow-sm fixed">
      {/*Mobile Dropdown*/}
      <div className="navbar-start w-auto">
        <div className="dropdown">
          <label className="btn btn-circle swap bg-primary-content swap-rotate lg:hidden">
            <input type="checkbox" />
            {/* hamburger icon */}
            <svg
              className="swap-off fill-secondary"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            {/* close icon */}
            <svg
              className="swap-on fill-secondary"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <ThemeController />
            </li>
            <li>My characters</li>
            <li>
              <a href="">My characters</a>
            </li>
          </ul>
        </div>
        <p className="text-2xl font-bold font-fantasy text-secondary text-outline-secondary-content">
          D&D Manager
        </p>
      </div>
      {/*Desktop Menu*/}
      <div className="navbar-center hidden lg:flex flex-1 justify-start">
        <ul className="menu menu-horizontal px-1 gap-3">
          <li>
            <ThemeController />
          </li>
          <li>
            <button
              className="btn btn-primary-content"
              onClick={() => setIsCharactersModalOpen(true)}
            >
              My characters
            </button>
          </li>
          <li>
            <button
              className="btn btn-primary-content"
              onClick={handleNewCharacter}
            >
              Create new character
            </button>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {session ? (
          <>
            <p className="font-fantasy text-xl font-bold text-secondary text-outline-secondary-content">
              Hello
              {" " + session.user?.firstName}
            </p>

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {session.user?.avatar && (
                  <img src={session.user?.avatar || ""} alt="Profile" />
                )}
              </div>
            </div>
            <button className="btn btn-error" onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <a
            className="btn btn-success"
            onClick={() => router.push("/registration")}
          >
            Log In / Sign Up
          </a>
        )}
      </div>

      {isCharactersModalOpen && (
        <CharactersModal
          handleOnClose={() => setIsCharactersModalOpen(false)}
        />
      )}
    </div>
  );
}
