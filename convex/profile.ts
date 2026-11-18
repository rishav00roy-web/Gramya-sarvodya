import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const INTERESTS = ["volunteer", "partner", "donor", "farmer", "learner", "other"];

/* The signed-in member's own profile, or null when signed out. */
export const me = query({
  args: {},
  handler: async (ctx) => {
    const id = await getAuthUserId(ctx);
    if (!id) return null;
    const user = await ctx.db.get(id);
    if (!user) return null;
    return {
      email: user.email ?? "",
      name: user.name ?? "",
      phone: user.phone ?? "",
      village: user.village ?? "",
      district: user.district ?? "",
      interest: user.interest ?? "",
      about: user.about ?? "",
      joined: user._creationTime,
    };
  },
});

const clean = (s: string, max: number) => s.trim().slice(0, max);

/* A member may change only their own profile; email stays as signed in. */
export const update = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    village: v.string(),
    district: v.string(),
    interest: v.string(),
    about: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await getAuthUserId(ctx);
    if (!id) throw new Error("Please sign in again.");
    const interest = INTERESTS.includes(args.interest) ? args.interest : "";
    await ctx.db.patch(id, {
      name: clean(args.name, 80),
      phone: clean(args.phone, 20),
      village: clean(args.village, 80),
      district: clean(args.district, 80),
      interest,
      about: clean(args.about, 600),
    });
  },
});
