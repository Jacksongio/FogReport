export type ErrorContext =
  | "auth.signIn"
  | "auth.signUp"
  | "auth.forgotPassword"
  | "auth.resetCode"
  | "auth.resendCode"
  | "briefing.generate"
  | "briefing.simulation"
  | "briefing.save"
  | "treaties.search"
  | "countries.load";

const NETWORK_PATTERNS = [
  "failed to fetch",
  "networkerror",
  "network request failed",
  "load failed",
  "err_network",
  "err_internet_disconnected",
  "fetch failed",
];

const TIMEOUT_PATTERNS = ["timeout", "timed out", "etimedout"];

const RATE_LIMIT_PATTERNS = ["rate limit", "too many requests", "429"];

const QUOTA_PATTERNS = ["quota", "insufficient_quota", "billing"];

function rawMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  if (err && typeof err === "object" && "message" in err) {
    return String((err as { message: unknown }).message ?? "");
  }
  return "";
}

function lower(err: unknown): string {
  return rawMessage(err).toLowerCase();
}

function isNetwork(err: unknown): boolean {
  const m = lower(err);
  return NETWORK_PATTERNS.some((p) => m.includes(p));
}

function isTimeout(err: unknown): boolean {
  const m = lower(err);
  return TIMEOUT_PATTERNS.some((p) => m.includes(p));
}

function isRateLimit(err: unknown): boolean {
  const m = lower(err);
  return RATE_LIMIT_PATTERNS.some((p) => m.includes(p));
}

function isQuota(err: unknown): boolean {
  const m = lower(err);
  return QUOTA_PATTERNS.some((p) => m.includes(p));
}

function stripConvexNoise(message: string): string {
  // Convex wraps server errors in noisy prefixes like:
  //   [CONVEX A(auth:signIn)] Server Error\nUncaught Error: <real message>
  // and trailing "    at <stack>" lines. Pull out the most useful sentence.
  const cleaned = message
    .replace(/\[CONVEX[^\]]*\]\s*/gi, "")
    .replace(/^Server Error\s*/i, "")
    .replace(/Uncaught Error:\s*/i, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("at "));
  return cleaned[0] || message;
}

export interface FriendlyError {
  title: string;
  description: string;
}

export function describeError(
  context: ErrorContext,
  err: unknown,
): FriendlyError {
  const raw = rawMessage(err);
  const m = raw.toLowerCase();

  if (isNetwork(err)) {
    return {
      title: "Connection problem",
      description:
        "We couldn't reach the server. Check your internet connection and try again.",
    };
  }

  if (isTimeout(err)) {
    return {
      title: "Request timed out",
      description:
        "The server took too long to respond. Please try again in a moment.",
    };
  }

  switch (context) {
    case "auth.signIn": {
      if (isRateLimit(err)) {
        return {
          title: "Too many attempts",
          description:
            "You've tried to sign in too many times. Please wait a minute before trying again.",
        };
      }
      // The form validates email/password format before submission, so any
      // server-side rejection that isn't a network/timeout/rate-limit is
      // almost always a credentials mismatch. Convex Auth deliberately
      // returns a generic "Server Error" here to avoid leaking which field
      // was wrong, so we default to a credentials message.
      return {
        title: "Incorrect email or password",
        description:
          "Double-check your credentials and try again. If you forgot your password, use the reset link below.",
      };
    }

    case "auth.signUp": {
      if (m.includes("already exists") || m.includes("duplicate")) {
        return {
          title: "Account already exists",
          description:
            "An account with that email already exists. Try signing in instead.",
        };
      }
      if (m.includes("invalid email")) {
        return {
          title: "Invalid email",
          description: "Please enter a valid email address.",
        };
      }
      if (m.includes("password") && m.includes("weak")) {
        return {
          title: "Password too weak",
          description:
            "Choose a stronger password — at least 8 characters with a letter and a number.",
        };
      }
      return {
        title: "Could not create account",
        description: stripConvexNoise(raw) || "Please try again.",
      };
    }

    case "auth.forgotPassword": {
      if (isRateLimit(err)) {
        return {
          title: "Too many requests",
          description:
            "You've requested too many reset codes. Please wait a few minutes before trying again.",
        };
      }
      if (m.includes("not found") || m.includes("no account")) {
        // Avoid leaking whether an account exists; show a generic message.
        return {
          title: "Check your inbox",
          description:
            "If an account exists for that email, a verification code is on its way.",
        };
      }
      if (m.includes("failed to send") || m.includes("resend")) {
        return {
          title: "Couldn't send reset email",
          description:
            "We couldn't send the verification code right now. Please try again in a moment.",
        };
      }
      return {
        title: "Couldn't send reset code",
        description: stripConvexNoise(raw) || "Please try again.",
      };
    }

    case "auth.resetCode": {
      if (
        m.includes("invalid code") ||
        m.includes("invalidsecret") ||
        m.includes("incorrect code") ||
        m.includes("wrong code") ||
        m.includes("verification") ||
        m.includes("token")
      ) {
        if (m.includes("expired") || m.includes("expiry")) {
          return {
            title: "Code expired",
            description:
              "Your verification code has expired. Request a new one to continue.",
          };
        }
        return {
          title: "Invalid verification code",
          description:
            "That code didn't match. Double-check the digits or request a new code.",
        };
      }
      if (m.includes("expired") || m.includes("expiry")) {
        return {
          title: "Code expired",
          description:
            "Your verification code has expired. Request a new one to continue.",
        };
      }
      if (isRateLimit(err)) {
        return {
          title: "Too many attempts",
          description: "Please wait a moment before trying that code again.",
        };
      }
      return {
        title: "Couldn't reset password",
        description: stripConvexNoise(raw) || "Please try again.",
      };
    }

    case "auth.resendCode": {
      if (isRateLimit(err)) {
        return {
          title: "Slow down",
          description: "Please wait a moment before requesting another code.",
        };
      }
      return {
        title: "Couldn't resend code",
        description: stripConvexNoise(raw) || "Please try again.",
      };
    }

    case "briefing.generate": {
      if (isQuota(err)) {
        return {
          title: "AI quota reached",
          description:
            "The AI service is temporarily over its quota. Please try again later.",
        };
      }
      if (isRateLimit(err)) {
        return {
          title: "AI is busy",
          description:
            "The AI service is rate-limited. Please wait a minute and try again.",
        };
      }
      if (m.includes("openai error 5") || m.includes("server error")) {
        return {
          title: "AI service unavailable",
          description:
            "The AI service is temporarily unavailable. We've shown a fallback briefing — please try again later.",
        };
      }
      if (m.includes("no simulation results")) {
        return {
          title: "Missing simulation data",
          description:
            "We couldn't run the underlying simulation. Try again or adjust your scenario inputs.",
        };
      }
      if (m.includes("json") || m.includes("parse")) {
        return {
          title: "Briefing format error",
          description:
            "The AI returned an unexpected response. We've shown a fallback briefing — please try again.",
        };
      }
      return {
        title: "Briefing generation failed",
        description:
          stripConvexNoise(raw) ||
          "We couldn't generate your briefing. A fallback has been shown — please try again.",
      };
    }

    case "briefing.simulation": {
      if (isQuota(err) || isRateLimit(err)) {
        return {
          title: "Analysis temporarily unavailable",
          description:
            "The AI service is busy. Showing basic recommendations — please try again later for a fresh analysis.",
        };
      }
      return {
        title: "Analysis unavailable",
        description:
          "AI analysis is currently unavailable. Showing basic recommendations.",
      };
    }

    case "briefing.save": {
      return {
        title: "Couldn't save analysis",
        description:
          "Your analysis parameters didn't save, but the simulation will continue.",
      };
    }

    case "treaties.search": {
      return {
        title: "Couldn't load treaties",
        description:
          "Unable to load relevant treaties right now. Please try again.",
      };
    }

    case "countries.load": {
      return {
        title: "Couldn't load country list",
        description:
          "We couldn't load the list of countries. Refresh the page to try again.",
      };
    }
  }
}
