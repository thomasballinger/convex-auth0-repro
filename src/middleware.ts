import type { NextRequest } from "next/server";
import { auth0 } from "./core/library/auth0";

/**
 * Middleware for processing and transforming incoming server requests
 *
 * @description
 * This middleware intercepts and processes incoming requests, allowing for
 * request modification, authentication, logging, or any other server-side
 * preprocessing before the request reaches its final route.
 *
 * @param {NextRequest} request - The incoming Next.js server request
 * @returns {Promise<Response>} The middleware response, potentially modified or transformed
 *
 * @remarks
 * - Provides a flexible hook for request interception and processing
 * - Can be used for various purposes such as authentication, logging,
 *   request transformation, or conditional routing
 */
export async function middleware(request: NextRequest) {
	// Process the request using Auth0 middleware (or any other middleware logic)
	return await auth0.middleware(request);
}

/**
 * Configuration for the middleware matcher
 *
 * @description
 * Defines the scope of routes where the middleware will be applied,
 * with explicit exclusions for static files, optimization files,
 * and metadata files.
 *
 * @type {Object}
 * @property {string[]} matcher - Array of route patterns to match
 *
 * @remarks
 * - Provides granular control over which routes are processed
 * - Excludes system and static files to optimize performance
 * - Allows for comprehensive route coverage with specific exceptions
 */
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 * - landing page
		 */
		"/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)",
	],
};
