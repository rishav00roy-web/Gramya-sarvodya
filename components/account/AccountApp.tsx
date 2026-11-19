"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { useEffect, useRef } from "react";
import { ORG } from "@/lib/site";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import { AUTH_EVENT, ConvexShell, hasConvex } from "./convex";

/* The account area runs entirely in the browser and talks to Convex, so the
   rest of the site stays a static export. Until the Convex deployment is
   connected the page says so instead of showing a form that cannot work. */
export default function AccountApp() {
  if (!hasConvex) {
    return (
      <div className="acard">
        <h2 className="acard__title">Sign-in is being set up</h2>
        <p className="acard__text">
          Member accounts will open here soon. Until then, write to{" "}
          <a href={`mailto:${ORG.email}`}>{ORG.email}</a> or call{" "}
          <a href={ORG.phoneHref}>{ORG.phone}</a>.
        </p>
      </div>
    );
  }
  return (
    <ConvexShell>
      <Gate />
    </ConvexShell>
  );
}

function Gate() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const leaving = useRef(false);

  // The header's "Log out" brings the reader here with ?logout=1.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("logout") !== "1" || leaving.current) return;
    leaving.current = true;
    params.delete("logout");
    const rest = params.toString();
    window.history.replaceState(null, "", window.location.pathname + (rest ? `?${rest}` : ""));
    void signOut();
  }, [signOut]);

  // Tell the header whenever the signed-in state settles.
  useEffect(() => {
    if (!isLoading) window.dispatchEvent(new Event(AUTH_EVENT));
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <p className="acard__text" role="status">
        Checking whether you are signed in…
      </p>
    );
  }
  return isAuthenticated ? <Dashboard /> : <SignIn />;
}
