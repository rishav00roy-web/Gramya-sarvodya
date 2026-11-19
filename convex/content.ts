import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";
import type { QueryCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";

/* Admins are the email addresses listed in ADMIN_EMAILS (comma separated)
   on the Convex deployment. Only they can publish or remove items. */
async function adminId(ctx: QueryCtx) {
  const id = await getAuthUserId(ctx);
  if (!id) return null;
  const user = await ctx.db.get(id);
  const email = user?.email?.toLowerCase();
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return email && admins.includes(email) ? id : null;
}

const kind = v.union(v.literal("news"), v.literal("gallery"), v.literal("publication"));

/* Everything published of one kind, newest first, with file links. */
export const list = query({
  args: { kind },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("posts")
      .withIndex("kind_date", (q) => q.eq("kind", args.kind))
      .order("desc")
      .take(100);
    return Promise.all(
      rows.map(async (r) => ({
        id: r._id,
        title: r.title,
        body: r.body ?? "",
        date: r.date,
        link: r.link ?? "",
        fileUrl: r.fileId ? await ctx.storage.getUrl(r.fileId) : null,
      })),
    );
  },
});

export const isAdmin = query({
  args: {},
  handler: async (ctx) => (await adminId(ctx)) !== null,
});

export const uploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    if (!(await adminId(ctx))) throw new ConvexError("Only admins can upload.");
    return ctx.storage.generateUploadUrl();
  },
});

const clean = (s: string, max: number) => s.trim().slice(0, max);

export const create = mutation({
  args: {
    kind,
    title: v.string(),
    body: v.optional(v.string()),
    date: v.string(),
    fileId: v.optional(v.id("_storage")),
    link: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const by = await adminId(ctx);
    if (!by) throw new ConvexError("Only admins can publish.");
    const title = clean(args.title, 160);
    if (!title) throw new ConvexError("A title is needed.");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(args.date)) throw new ConvexError("Use a real date.");
    if (args.kind === "gallery" && !args.fileId) throw new ConvexError("Choose a photograph.");
    if (args.fileId) {
      // The browser checks this too; this stops a PDF going up as a photo.
      const file = await ctx.db.system.get(args.fileId);
      const type = file?.contentType ?? "";
      const ok = args.kind === "publication" ? type === "application/pdf" : type.startsWith("image/");
      if (!ok)
        throw new ConvexError(
          args.kind === "publication" ? "Publications must be a PDF." : "Choose an image file.",
        );
    }
    const link = args.link ? clean(args.link, 500) : undefined;
    if (link && !/^https:\/\//.test(link)) throw new ConvexError("Links must start with https://");
    await ctx.db.insert("posts", {
      kind: args.kind,
      title,
      body: args.body ? clean(args.body, 4000) : undefined,
      date: args.date,
      fileId: args.fileId,
      link,
      by,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    if (!(await adminId(ctx))) throw new ConvexError("Only admins can remove items.");
    const row = await ctx.db.get(args.id);
    if (!row) return;
    if (row.fileId) await ctx.storage.delete(row.fileId);
    await ctx.db.delete(args.id);
  },
});
