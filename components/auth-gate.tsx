"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { useAuthActions } from "@convex-dev/auth/react";
import { AuthLoading, Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import StarryBackground from "@/components/StarryBackground";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  email: string[];
  password: string[];
  confirmPassword: string[];
}

const emptyErrors: FieldErrors = {
  email: [],
  password: [],
  confirmPassword: [],
};

function validate(
  flow: "signIn" | "signUp",
  email: string,
  password: string,
  confirmPassword: string,
): FieldErrors {
  const errors: FieldErrors = {
    email: [],
    password: [],
    confirmPassword: [],
  };

  if (!email.trim()) {
    errors.email.push("Email is required.");
  } else if (!EMAIL_RE.test(email.trim())) {
    errors.email.push("Enter a valid email address (e.g., name@example.com).");
  }

  if (!password) {
    errors.password.push("Password is required.");
  } else {
    if (password.length < 8) {
      errors.password.push("Must be at least 8 characters.");
    }
    if (flow === "signUp") {
      if (!/[a-zA-Z]/.test(password)) {
        errors.password.push("Include at least one letter.");
      }
      if (!/[0-9]/.test(password)) {
        errors.password.push("Include at least one number.");
      }
    }
  }

  if (flow === "signUp") {
    if (!confirmPassword) {
      errors.confirmPassword.push("Please confirm your password.");
    } else if (password !== confirmPassword) {
      errors.confirmPassword.push("Passwords do not match.");
    }
  }

  return errors;
}

function FieldErrorDropdown({ messages }: { messages: string[] }) {
  if (messages.length === 0) return null;
  return (
    <div
      role="alert"
      className="absolute left-0 right-0 top-full mt-1 z-20 rounded-md border border-red-500/40 bg-red-950/80 backdrop-blur-md p-3 text-xs text-red-200 shadow-lg shadow-red-900/30 animate-in fade-in slide-in-from-top-1"
    >
      <div className="flex items-start gap-2">
        <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-red-400" />
        <ul className="space-y-1">
          {messages.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const errors = showErrors
    ? validate(flow, email, password, confirmPassword)
    : emptyErrors;

  const switchFlow = () => {
    setSubmitError(null);
    setShowErrors(false);
    setConfirmPassword("");
    setFlow(flow === "signIn" ? "signUp" : "signIn");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const fieldErrors = validate(flow, email, password, confirmPassword);
    const hasErrors =
      fieldErrors.email.length > 0 ||
      fieldErrors.password.length > 0 ||
      fieldErrors.confirmPassword.length > 0;

    if (hasErrors) {
      setShowErrors(true);
      return;
    }

    setShowErrors(false);
    setSubmitting(true);

    const formData = new FormData();
    formData.set("email", email.trim());
    formData.set("password", password);
    formData.set("flow", flow);

    try {
      await signIn("password", formData);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Authentication failed";
      setSubmitError(
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
            noValidate
            className="w-full space-y-4 bg-dark-card/60 backdrop-blur-sm border border-dark-border rounded-2xl p-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-text">
                Email
              </label>
              <div className="relative">
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={errors.email.length > 0}
                  className={`bg-dark-bg border-dark-border text-dark-text ${
                    errors.email.length > 0
                      ? "border-red-500/60 focus-visible:ring-red-500/40"
                      : ""
                  }`}
                />
                <FieldErrorDropdown messages={errors.email} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-text">
                Password
              </label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={
                    flow === "signIn" ? "current-password" : "new-password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  aria-invalid={errors.password.length > 0}
                  className={`bg-dark-bg border-dark-border text-dark-text pr-10 ${
                    errors.password.length > 0
                      ? "border-red-500/60 focus-visible:ring-red-500/40"
                      : ""
                  }`}
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
                <FieldErrorDropdown messages={errors.password} />
              </div>
            </div>

            {flow === "signUp" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-text">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    aria-invalid={errors.confirmPassword.length > 0}
                    className={`bg-dark-bg border-dark-border text-dark-text pr-10 ${
                      errors.confirmPassword.length > 0
                        ? "border-red-500/60 focus-visible:ring-red-500/40"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-dark-muted hover:text-flame transition-colors"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  <FieldErrorDropdown messages={errors.confirmPassword} />
                </div>
              </div>
            )}

            {submitError && (
              <p className="text-sm text-red-400" role="alert">
                {submitError}
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
              onClick={switchFlow}
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
