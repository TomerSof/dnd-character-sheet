"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../api/supa-client";
import FloatingTxtInput from "../components/FloatingTxtInput";
import PasswordChecklist from "react-password-checklist";
import { manualRegister, postOAuthRegister } from "../api/register/route";

export default function Registration() {
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
      const { user, session } = await manualRegister({
        email,
        password,
        fullName: `${firstName} ${lastName}`.trim(),
      });

      console.log("User registered:", user);
      // Optionally store session locally or redirect
      router.push("/"); // or wherever you want to go after signup
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong.");
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

      router.back();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/registration" },
    });

    if (error) console.error("OAuth error:", error.message);
  };

  useEffect(() => {
    const handlePostOAuth = async () => {
      try {
        const result = await postOAuthRegister();
        if (result) {
          console.log("OAuth user session:", result.session);
          router.push("/"); // redirect after successful OAuth registration
        }
      } catch (err: any) {
        console.error(err);
        alert(err.message || "OAuth registration failed.");
      }
    };

    handlePostOAuth();
  }, []);

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
