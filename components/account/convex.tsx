"use client";

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

/* One Convex connection for the whole visit, made only on pages that need
   it (My Account and Resources) and only when the site was built with a
   Convex deployment. */
const url = process.env.NEXT_PUBLIC_CONVEX_URL;
let client: ConvexReactClient | null = null;
export const hasConvex = Boolean(url);

export function ConvexShell({ children }: { children: ReactNode }) {
  if (!url) return null;
  client ??= new ConvexReactClient(url);
  return <ConvexAuthProvider client={client}>{children}</ConvexAuthProvider>;
}

/* The header has no Convex connection of its own; it asks the browser
   whether a sign-in token is stored, and hears when that changes. */
export const AUTH_EVENT = "gsf-auth";
export function hasStoredSession() {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)?.startsWith("__convexAuthJWT")) return true;
    }
  } catch {}
  return false;
}
