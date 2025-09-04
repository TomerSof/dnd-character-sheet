"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "./contexts/SessionContext";

export default function Navbar() {
  const router = useRouter();
  const session = useSession();

  return (
    <div className="navbar bg-primary/80 shadow-sm fixed">
      <div className="navbar-start">
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
              <a>Empty</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Empty</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {session ? (
          <>
            <p className="font-fantasy text-xl font-bold text-secondary text-outline-secondary-content">
              Hello
              {" " + session.user?.name?.split(" ")[0]}
            </p>

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={session.user?.image || ""} alt="Profile" />
              </div>
            </div>
            <button className="btn btn-error" >
              Sign Out
            </button>
          </>
        ) : (
          <a
            className="btn btn-secondary"
            onClick={() => router.push("/registration")}
          >
            Registration
          </a>
        )}
      </div>
    </div>
  );
}
