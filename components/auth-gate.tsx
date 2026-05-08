"use client";

import {
  useState,
  type ReactNode,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import Image from "next/image";
import { useAuthActions } from "@convex-dev/auth/react";
import { AuthLoading, Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import StarryBackground from "@/components/StarryBackground";
import { useRef, useCallback } from "react";
import { describeError, type FriendlyError } from "@/lib/error-messages";

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

function SubmitErrorAlert({ error }: { error: FriendlyError | null }) {
  if (!error) return null;
  return (
    <div
      role="alert"
      className="rounded-md border border-red-500/40 bg-red-950/60 backdrop-blur-sm p-3 text-sm text-red-200 animate-in fade-in slide-in-from-top-1"
    >
      <div className="flex items-start gap-2">
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
        <div className="space-y-0.5">
          <p className="font-medium text-red-100">{error.title}</p>
          <p className="text-xs text-red-300/90">{error.description}</p>
        </div>
      </div>
    </div>
  );
}

function OTPInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const setRef = useCallback(
    (index: number) => (el: HTMLInputElement | null) => {
      inputRefs.current[index] = el;
    },
    [],
  );

  const handleChange = (index: number, digit: string) => {
    if (!/^\d?$/.test(digit)) return;
    const arr = value.padEnd(6, " ").split("");
    arr[index] = digit || " ";
    const next = arr.join("").replace(/ /g, "");
    onChange(next.slice(0, 6));
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted) {
      onChange(pasted);
      const focusIndex = Math.min(pasted.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={setRef(i)}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          onFocus={(e) => e.target.select()}
          className="w-11 h-14 sm:w-12 sm:h-14 text-center text-2xl font-bold rounded-xl
            bg-dark-bg border-2 border-dark-border text-white
            focus:border-flame focus:ring-2 focus:ring-flame/30 focus:outline-none
            transition-all duration-200 caret-flame
            placeholder:text-dark-border"
          placeholder="&middot;"
        />
      ))}
    </div>
  );
}

type AuthView = "signIn" | "signUp" | "forgotPassword" | "resetCode";

function SignInForm() {
  const { signIn } = useAuthActions();
  const [view, setView] = useState<AuthView>("signIn");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<FriendlyError | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [resending, setResending] = useState(false);

  const flow = view === "signUp" ? "signUp" : "signIn";
  const errors = showErrors
    ? validate(flow, email, password, confirmPassword)
    : emptyErrors;

  const switchFlow = () => {
    setSubmitError(null);
    setSubmitSuccess(null);
    setShowErrors(false);
    setConfirmPassword("");
    setView(view === "signIn" ? "signUp" : "signIn");
  };

  const goToForgotPassword = () => {
    setSubmitError(null);
    setSubmitSuccess(null);
    setShowErrors(false);
    setView("forgotPassword");
  };

  const goBackToSignIn = () => {
    setSubmitError(null);
    setSubmitSuccess(null);
    setShowErrors(false);
    setResetCode("");
    setNewPassword("");
    setResendCount(0);
    setView("signIn");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

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
      console.log("[AUTH DEBUG] Attempting signIn", {
        flow,
        email: email.trim(),
        convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL ?? "MISSING",
      });
      await signIn("password", formData);
      console.log("[AUTH DEBUG] signIn succeeded");
    } catch (err) {
      console.error("[AUTH DEBUG] signIn failed", {
        error: err instanceof Error ? err.message : err,
        fullError: err,
      });
      setSubmitError(
        describeError(flow === "signIn" ? "auth.signIn" : "auth.signUp", err),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      setSubmitError({
        title: "Invalid email",
        description:
          "Please enter a valid email address (e.g., name@example.com).",
      });
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.set("email", email.trim());
    formData.set("flow", "reset");

    try {
      await signIn("password", formData);
      setSubmitSuccess("A verification code has been sent to your email.");
      setView("resetCode");
    } catch (err) {
      console.error("[AUTH DEBUG] forgot password failed", err);
      setSubmitError(describeError("auth.forgotPassword", err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetCodeSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (resetCode.length !== 6 || !/^\d{6}$/.test(resetCode)) {
      setSubmitError({
        title: "Incomplete code",
        description:
          "Please enter the full 6-digit verification code from your email.",
      });
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      setSubmitError({
        title: "Password too short",
        description: "New password must be at least 8 characters.",
      });
      return;
    }
    if (!/[a-zA-Z]/.test(newPassword)) {
      setSubmitError({
        title: "Password too weak",
        description: "New password must include at least one letter.",
      });
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setSubmitError({
        title: "Password too weak",
        description: "New password must include at least one number.",
      });
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.set("email", email.trim());
    formData.set("code", resetCode.trim());
    formData.set("newPassword", newPassword);
    formData.set("flow", "reset-verification");

    try {
      await signIn("password", formData);
      setSubmitSuccess("Password reset successful! You are now signed in.");
    } catch (err) {
      console.error("[AUTH DEBUG] reset code failed", err);
      setSubmitError(describeError("auth.resetCode", err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCount >= 5 || resending) return;
    setSubmitError(null);
    setSubmitSuccess(null);
    setResending(true);

    const formData = new FormData();
    formData.set("email", email.trim());
    formData.set("flow", "reset");

    try {
      await signIn("password", formData);
      setResendCount((c) => c + 1);
      setSubmitSuccess("A new verification code has been sent to your email.");
      setResetCode("");
    } catch (err) {
      console.error("[AUTH DEBUG] resend code failed", err);
      setSubmitError(describeError("auth.resendCode", err));
    } finally {
      setResending(false);
    }
  };

  const subtitle =
    view === "signIn"
      ? "Sign in to access your private scenarios and intelligence briefings."
      : view === "signUp"
        ? "Create an account — your scenarios and briefings stay private to you."
        : view === "forgotPassword"
          ? "Enter your email and we'll send you a verification code to reset your password."
          : "Enter the code from your email and choose a new password.";

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

          <p className="text-base sm:text-lg text-dark-muted">{subtitle}</p>

          {/* Sign In / Sign Up form */}
          {(view === "signIn" || view === "signUp") && (
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
                      view === "signIn" ? "current-password" : "new-password"
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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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

              {view === "signUp" && (
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

              <SubmitErrorAlert error={submitError} />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-flame hover:bg-flame/90 text-white text-base font-semibold transition-all duration-200 hover:scale-[1.02] glow-flame hover-glow-flame"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {view === "signIn"
                      ? "Signing in..."
                      : "Creating account..."}
                  </>
                ) : view === "signIn" ? (
                  "Enter Simulation Platform"
                ) : (
                  "Create Account"
                )}
              </Button>

              {view === "signIn" && (
                <button
                  type="button"
                  className="w-full text-sm text-dark-muted hover:text-flame transition-colors"
                  onClick={goToForgotPassword}
                >
                  Forgot your password?
                </button>
              )}

              <button
                type="button"
                className="w-full text-sm text-dark-muted hover:text-flame transition-colors"
                onClick={switchFlow}
              >
                {view === "signIn"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </form>
          )}

          {/* Forgot Password — enter email */}
          {view === "forgotPassword" && (
            <form
              onSubmit={handleForgotPasswordSubmit}
              noValidate
              className="w-full space-y-4 bg-dark-card/60 backdrop-blur-sm border border-dark-border rounded-2xl p-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-text">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-dark-bg border-dark-border text-dark-text"
                />
              </div>

              <SubmitErrorAlert error={submitError} />
              {submitSuccess && (
                <p className="text-sm text-green-400" role="status">
                  {submitSuccess}
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
                    Sending code...
                  </>
                ) : (
                  "Send Reset Code"
                )}
              </Button>

              <button
                type="button"
                className="w-full text-sm text-dark-muted hover:text-flame transition-colors flex items-center justify-center gap-1"
                onClick={goBackToSignIn}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to sign in
              </button>
            </form>
          )}

          {/* Reset Code — enter code + new password */}
          {view === "resetCode" && (
            <form
              onSubmit={handleResetCodeSubmit}
              noValidate
              className="w-full space-y-5 bg-dark-card/60 backdrop-blur-sm border border-dark-border rounded-2xl p-6"
            >
              <div className="space-y-3">
                <label className="text-sm font-medium text-dark-text text-center block">
                  Verification Code
                </label>
                <OTPInput value={resetCode} onChange={setResetCode} />
                <div className="flex items-center justify-center gap-1 text-xs">
                  <span className="text-dark-muted">
                    Didn&apos;t receive a code?
                  </span>
                  {resendCount >= 5 ? (
                    <span className="text-red-400">
                      Maximum resends reached
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={resending}
                      className="text-flame hover:text-flame/80 font-medium transition-colors disabled:opacity-50"
                    >
                      {resending ? "Sending..." : "Resend code"}
                    </button>
                  )}
                  {resendCount > 0 && resendCount < 5 && (
                    <span className="text-dark-muted">
                      ({5 - resendCount} left)
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-text">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="bg-dark-bg border-dark-border text-dark-text pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-dark-muted hover:text-flame transition-colors"
                    aria-label={
                      showNewPassword ? "Hide password" : "Show password"
                    }
                    tabIndex={-1}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <SubmitErrorAlert error={submitError} />
              {submitSuccess && (
                <p className="text-sm text-green-400" role="status">
                  {submitSuccess}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-flame hover:bg-flame/90 text-white text-base font-semibold transition-all duration-200 hover:scale-[1.02] glow-flame hover-glow-flame"
                disabled={submitting || resetCode.length < 6}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Resetting password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>

              <button
                type="button"
                className="w-full text-sm text-dark-muted hover:text-flame transition-colors flex items-center justify-center gap-1"
                onClick={goBackToSignIn}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to sign in
              </button>
            </form>
          )}
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
