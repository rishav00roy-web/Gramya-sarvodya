// The site's build. Without a Convex deploy key it is the plain static
// export and the account page says sign-in is being set up. With
// CONVEX_DEPLOY_KEY set (in Vercel's environment variables) it first makes
// sure the Convex deployment has its sign-in keys and email settings, then
// pushes the functions in convex/ and builds the site against that
// deployment, which sets NEXT_PUBLIC_CONVEX_URL for the build.
import { execFileSync } from "node:child_process";
import { generateKeyPairSync } from "node:crypto";

const run = (args, opts = {}) =>
  execFileSync("npx", args, { stdio: ["ignore", "pipe", "inherit"], ...opts })
    .toString()
    .trim();

if (!process.env.CONVEX_DEPLOY_KEY) {
  console.log("No CONVEX_DEPLOY_KEY: building the static site without sign-in.");
  execFileSync("npx", ["next", "build"], { stdio: "inherit" });
  process.exit(0);
}

const get = (name) => {
  try {
    return run(["convex", "env", "get", name]);
  } catch {
    return "";
  }
};
// Values go through stdin-free argv to the Convex CLI, never to the log.
const set = (name, value) =>
  execFileSync("npx", ["convex", "env", "set", name, "--", value], {
    stdio: ["ignore", "ignore", "inherit"],
  });

// 1. Sign-in keys, made once and then left alone (changing them signs
//    everybody out).
if (!get("JWT_PRIVATE_KEY") || !get("JWKS")) {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  const pem = privateKey.export({ type: "pkcs8", format: "pem" }).toString();
  const jwk = publicKey.export({ format: "jwk" });
  set("JWT_PRIVATE_KEY", pem.trimEnd().replace(/\n/g, " "));
  set("JWKS", JSON.stringify({ keys: [{ use: "sig", alg: "RS256", ...jwk }] }));
  console.log("Convex: sign-in keys created.");
}

// 2. Settings copied from Vercel to Convex, so they live in one place.
const site = process.env.SITE_URL || "https://gramya-three.vercel.app";
if (get("SITE_URL") !== site) set("SITE_URL", site);
for (const name of ["AUTH_BREVO_KEY", "AUTH_RESEND_KEY", "AUTH_EMAIL_FROM"]) {
  const value = process.env[name];
  if (value && get(name) !== value) {
    set(name, value);
    console.log(`Convex: ${name} updated.`);
  }
}
if (!process.env.AUTH_BREVO_KEY && !process.env.AUTH_RESEND_KEY && !get("AUTH_BREVO_KEY") && !get("AUTH_RESEND_KEY")) {
  console.warn("Convex: no AUTH_BREVO_KEY or AUTH_RESEND_KEY is set, so sign-in codes cannot be emailed yet.");
}

// 3. Push the functions and build the site against them.
execFileSync("npx", ["convex", "deploy", "--cmd-url-env-var-name", "NEXT_PUBLIC_CONVEX_URL", "--cmd", "npx next build"], { stdio: "inherit" });
