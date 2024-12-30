import AuthRoutes from "@/configuration/routes/authentication";
import ApplicationVariables from "@/configuration/variables/application";
import { parseAuth0Sub } from "@/utilities/auth0";
import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";
import { api } from "@convex-backend/_generated/api";
import { fetchMutation, fetchQuery } from "convex/nextjs";

/**
 * Configures the Auth0 authentication client for FlowUp application
 *
 * @description
 * This module initializes a custom Auth0 authentication client with specific configuration
 * tailored to the FlowUp application's authentication workflow. It provides a secure and
 * flexible authentication mechanism with custom session handling.
 */
export const auth0 = new Auth0Client({
	domain: "dev-ui203ramxow30kmt.us.auth0.com",
	/**
	 * Allow insecure requests to be made to the authorization server.
	 * This can be useful when testing with a mock OIDC provider that does not support TLS, locally.
	 * This option can only be used when NODE_ENV is not set to production.
	 */
	allowInsecureRequests: true,

	/**
	 * The path to redirect the user to after successfully authenticating. Defaults to /.
	 */
	signInReturnToPath: "/d/workspaces",

	/**
	 * Preprocesses and sanitizes the authentication session before it is saved
	 *
	 * This method performs two critical transformations on the incoming session:
	 * 1. Standardizes the user subject (sub) identifier by using a cleaned, formatted version
	 * 2. Adds an explicit OAuth provider tracking property
	 *
	 * @param session - The original authentication session object from Auth0
	 * @returns A modified session object with a standardized user identifier and provider information
	 *
	 * Key Transformations:
	 * - Replaces the original 'sub' with a cleaned, consistent format
	 * - Adds an 'oauth' property to track the authentication provider
	 * - Preserves all other existing session and user properties
	 */
	async beforeSessionSaved(session, idToken) {
		// Parse the original Auth0 subject identifier to extract provider and formatted ID
		const parsedSub = parseAuth0Sub(session.user.sub);

		return {
			// Spread existing session properties to preserve original data
			...session,
			user: {
				// Spread existing user properties
				...session.user,
				// Replace the original sub with a cleaned, formatted identifier
				sub: parsedSub.formattedId,
				// Add an additional property to track the OAuth provider
				oauth: parsedSub.provider,
				// Raw identity token
				idToken,
			},
		};
	},

	/**
	 * Handles the authentication callback process after successful login via Auth0
	 * !! The session of this callback won't reflect the sanitized session from beforeSessionSaved
	 *
	 * @param error - Any authentication error that occurred during the login process
	 * @param context - The authentication context, including potential return URL
	 * @param session - The user session containing authentication details
	 * @returns A redirect response to either the user's intended destination, a workspace, or logout
	 *
	 * @throws {Error} Throws an error if critical authentication or profile creation steps fail
	 *
	 * Key Workflow:
	 * 1. Validate session and check for authentication errors
	 * 2. Parse the Auth0 subject identifier
	 * 3. Fetch user profile or create a new profile if not exists
	 * 4. Redirect to the intended destination or default workspace page
	 */
	async onCallback(error, context, session) {
		try {
			// Immediately redirect to logout if no valid session or authentication error
			if (!session || error) {
				return NextResponse.redirect(
					new URL(AuthRoutes.logout, ApplicationVariables.baseUrl),
				);
			}

			// Validate and parse the Auth0 subject identifier
			const parsedSub = parseAuth0Sub(session.user.sub);
			if (!parsedSub || !parsedSub.formattedId) {
				return NextResponse.redirect(
					new URL(AuthRoutes.logout, ApplicationVariables.baseUrl),
				);
			}

			// Attempt to fetch existing user profile
			let profile = await fetchQuery(
				api.queries.profiles.getUserProfile,
				{
					sub: parsedSub.formattedId,
				},
			);

			// Create profile if not exists
			if (!profile) {
				// Determine user's name based on authentication provider
				const name =
					parsedSub.provider === "auth"
						? session.user.nickname
						: session.user.name;

				// Validate name is present
				if (!name) {
					return NextResponse.redirect(
						new URL(
							AuthRoutes.logout,
							ApplicationVariables.baseUrl,
						),
					);
				}

				// Validate email is present
				if (!session.user.email) {
					return NextResponse.redirect(
						new URL(
							AuthRoutes.logout,
							ApplicationVariables.baseUrl,
						),
					);
				}

				// Create new user profile
				profile = await fetchMutation(
					api.queries.profiles.createUserProfile,
					{
						name,
						email: session.user.email,
						sub: parsedSub.formattedId,
						provider: parsedSub.provider,
					},
				);

				// Verify profile creation was successful
				if (!profile) {
					console.error("Failed to create user profile", {
						sub: parsedSub.formattedId,
						provider: parsedSub.provider,
					});
					return NextResponse.redirect(
						new URL(
							AuthRoutes.logout,
							ApplicationVariables.baseUrl,
						),
					);
				}
			}

			// Redirect to intended destination or default workspace page
			return NextResponse.redirect(
				new URL(
					context.returnTo || "/d/workspaces",
					ApplicationVariables.baseUrl,
				),
			);
		} catch (unexpectedError) {
			// Catch and log any unexpected errors during the callback process
			console.error(
				"Unexpected error in authentication callback",
				unexpectedError,
			);
			return NextResponse.redirect(
				new URL(AuthRoutes.logout, ApplicationVariables.baseUrl),
			);
		}
	},
});
