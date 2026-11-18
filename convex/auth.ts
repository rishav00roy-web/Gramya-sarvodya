import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";
import { EmailOTP } from "./EmailOTP";

/* Two ways in: a code sent to the member's email, and "Continue with
   Google" (AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET on the deployment). */
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [EmailOTP, Google],
});
