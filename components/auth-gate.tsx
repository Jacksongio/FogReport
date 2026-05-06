"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { useAuthActions } from "@convex-dev/auth/react";
import {
  AuthLoading,
  Authenticated,
  Unauthenticated,
} from "convex/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import StarryBackground from "@/components/StarryBackground";

function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    formData.set("flow", flow);
    try {
      await signIn("password", formData);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Authentication failed";
      setError(
        flow === "signIn"
          ? "Invalid email or password."
          : message.includes("already exists")
            ? "An account with that email already exists."
            : message,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <StarryBackground />

      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 relative z-10">
        {/* Logo Section */}
        <div className="flex-shrink-0 relative">
          <div className="relative overflow-hidden rounded-3xl glow-blue">
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-light-reflection"></div>
            <Image
              src="/fogreport.png"
              alt="FogReport Logo"
              width={400}
              height={400}
              className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-contain relative z-0 rounded-3xl"
              priority
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 w-full max-w-md">
          {/* Motto */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-text leading-tight">
            <span className="text-flame">Clarity</span> in real-time
            <br />
            through the <span className="text-flame">Fog of War.</span>
          </h1>

          <p className="text-base sm:text-lg text-dark-muted">
            {flow === "signIn"
              ? "Sign in to access your private scenarios and intelligence briefings."
              : "Create an account — your scenarios and briefings stay private to you."}
          </p>

          {/* Auth form */}
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-4 bg-dark-card/60 backdrop-blur-sm border border-dark-border rounded-2xl p-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-text">Email</label>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="bg-dark-bg border-dark-border text-dark-text"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-text">Password</label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={flow === "signIn" ? "current-password" : "new-password"}
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  className="bg-dark-bg border-dark-border text-dark-text pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-dark-muted hover:text-flame transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-flame hover:bg-flame/90 text-white text-base font-semibold transition-all duration-200 hover:scale-[1.02] glow-flame hover-glow-flame"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {flow === "signIn" ? "Signing in..." : "Creating account..."}
                </>
              ) : flow === "signIn" ? (
                "Enter Simulation Platform"
              ) : (
                "Create Account"
              )}
            </Button>
            <button
              type="button"
              className="w-full text-sm text-dark-muted hover:text-flame transition-colors"
              onClick={() => {
                setError(null);
                setFlow(flow === "signIn" ? "signUp" : "signIn");
              }}
            >
              {flow === "signIn"
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center relative overflow-hidden">
      <StarryBackground />
      <Loader2 className="h-8 w-8 animate-spin text-flame relative z-10" />
    </div>
  );
}

export function AuthGate({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthLoading>
        <LoadingScreen />
      </AuthLoading>
      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
      <Authenticated>{children}</Authenticated>
    </>
  );
}
