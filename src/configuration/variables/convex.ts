/**
 * An object containing required Convex configuration variables
 *
 * @description
 * This module centralizes the Convex configuration by extracting
 * the project-specific URL from environment variables. The use of
 * environment variables ensures that configuration can be easily
 * changed between different environments (development, staging, production)
 * without modifying the code.
 */
const ConvexVariables = {
	/**
	 * The URL of the Convex project
	 *
	 * @remarks
	 * - Uses the NEXT_PUBLIC prefix to make the variable accessible in the browser
	 * - The non-null assertion (!) ensures that the environment variable is set
	 * - Typically set in .env files or deployment environment configurations
	 */
	url: process.env.NEXT_PUBLIC_CONVEX_URL!,
};

export default ConvexVariables;
