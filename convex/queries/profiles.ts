import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const getUserProfile = query({
	args: {
		sub: v.string(),
	},
	handler: async (ctx, args) => {
		if (!args.sub) return null;

		const profile = await ctx.db
			.query("profiles")
			.filter((q) => q.eq(q.field("sub"), args.sub))
			.first();

		return profile;
	},
});

export const createUserProfile = mutation({
	args: {
		sub: v.string(),
		name: v.string(),
		email: v.optional(v.string()),
		provider: v.string(),
	},
	handler: async (ctx, args) => {
		// Check if a profile with the same sub or email already exists
		const existingProfile = await ctx.db
			.query("profiles")
			.filter((q) =>
				q.or(
					q.eq(q.field("sub"), args.sub),
					q.eq(q.field("email"), args.email),
				),
			)
			.first();

		// If profile exists, return the existing profile
		if (existingProfile) {
			return existingProfile;
		}

		// Otherwise, create a new profile
		const profile = await ctx.db.insert("profiles", {
			sub: args.sub,
			name: args.name,
			email: args.email,
			provider: args.provider,
		});

		return profile;
	},
});
