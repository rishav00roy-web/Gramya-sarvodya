import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/* Convex Auth's own tables, with the users table widened to hold the
   profile a member fills in on their dashboard. */
export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    image: v.optional(v.string()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    village: v.optional(v.string()),
    district: v.optional(v.string()),
    interest: v.optional(v.string()),
    about: v.optional(v.string()),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),
});
