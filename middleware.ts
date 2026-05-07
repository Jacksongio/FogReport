import { convexAuthNextjsMiddleware } from "@convex-dev/auth/nextjs/server";

export default convexAuthNextjsMiddleware({ verbose: true });

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
