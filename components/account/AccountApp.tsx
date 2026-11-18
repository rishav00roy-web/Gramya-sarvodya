"use client";

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient, useConvexAuth } from "convex/react";
import { useState } from "react";
import { ORG } from "@/lib/site";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";

const url = process.env.NEXT_PUBLIC_CONVEX_URL;

/* The account area runs entirely in the browser and talks to Convex, so the
   rest of the site stays a static export. Until the Convex deployment is
   connected the page says so instead of showing a form that cannot work. */
export default function AccountApp() {
  const [client] = useState(() => (url ? new ConvexReactClient(url) : null));
  if (!client) {
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
    <ConvexAuthProvider client={client}>
      <Gate />
    </ConvexAuthProvider>
  );
}

function Gate() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  if (isLoading) {
    return (
      <p className="acard__text" role="status">
        Checking whether you are signed in…
      </p>
    );
  }
  return isAuthenticated ? <Dashboard /> : <SignIn />;
}
