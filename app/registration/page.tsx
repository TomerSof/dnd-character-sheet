"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../api/supa-client";
import FloatingTxtInput from "../components/FloatingTxtInput";
import PasswordChecklist from "react-password-checklist";
import { flattenUser, useSession } from "../contexts/SessionContext";

export default function Registration() {
  const { setSession } = useSession();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const router = useRouter();

  const handleManualRegister = async () => {
    try {
      const res = await fetch("/api/register/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          fullName: `${firstName} ${lastName}`.trim(),
        }),
      });

      if (!res.ok) throw new Error("Registration failed");
      const { user, session } = await res.json();

      console.log("User registered:", user);
      // Optionally store session locally or redirect
      if (session && setSession) setSession(flattenUser(session)); // <- update context
      router.push("/sheet");
    } catch (err: unknown) {
      const e = err as Error;
      console.error(e);
      alert(e.message || "Something went wrong.");
    }
  };

  const handleManualLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(`Login failed: ${error.message}`);
        return;
      }

      // Update last_login in users table
      const { error: updateError } = await supabase
        .from("users")
        .update({ last_login: new Date() })
        .eq("email", email);

      if (updateError)
        console.error("Failed to update last_login:", updateError.message);

      setSession(flattenUser(data.session));
      console.log("User logged in:", data.user);

      router.back();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_BASE_URL + "/",
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) console.error("OAuth error:", error.message);
  };

  useEffect(() => {
    const checkOAuthSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSession(flattenUser(data.session));
      }
    };

    checkOAuthSession();
  }, [setSession]);

  const handleSubmit = async () => {
    if (mode === "register" && !isPasswordValid) return;

    if (mode === "login") {
      handleManualLogin();
    } else {
      handleManualRegister();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-2xl font-bold font-fantasy">
        {mode === "login" ? "Log In to" : "Create"} Your Account
      </h1>

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">
          {mode === "login" ? "Login" : "Register"} Manually
        </legend>

        {mode === "register" && (
          <div className="flex gap-2">
            <FloatingTxtInput
              title="First Name"
              placeholder="First Name"
              value={firstName}
              onChange={setFirstName}
            />
            <FloatingTxtInput
              title="Last Name"
              placeholder="Last Name"
              value={lastName}
              onChange={setLastName}
            />
          </div>
        )}

        <FloatingTxtInput
          title="Email"
          placeholder="Enter Email"
          type="email"
          value={email}
          onChange={setEmail}
        />

        <FloatingTxtInput
          title="Password"
          placeholder="Password"
          type={isPasswordVisible ? "text" : "password"}
          value={password}
          onChange={setPassword}
        />

        {mode === "register" && (
          <FloatingTxtInput
            title="Confirm Password"
            placeholder="Confirm Password"
            type={isPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        )}

        {mode === "register" && (
          <PasswordChecklist
            rules={["minLength", "number", "capital", "match", "lowercase"]}
            minLength={8}
            value={password}
            valueAgain={confirmPassword}
            onChange={setIsPasswordValid}
          />
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-success"
            onChange={() => setIsPasswordVisible((prev) => !prev)}
          />
          <span>Show Password</span>
        </div>

        <button
          className="btn btn-neutral mt-4"
          onClick={handleSubmit}
          disabled={mode === "register" && !isPasswordValid}
        >
          {mode === "login" ? "Log In" : "Register"}
        </button>
      </fieldset>

      <button
        className="text-sm link mt-2"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        {mode === "login"
          ? "Don't have an account? Register"
          : "Already have an account? Log in"}
      </button>

      <div className="divider">OR</div>

      <button className="btn btn-primary" onClick={handleGoogleLogin}>
        Continue with Google
      </button>
    </div>
  );
}
