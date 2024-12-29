import { SessionData } from "@auth0/nextjs-auth0/types";

/**
 * Extended session data type that adds an OAuth provider identifier to the user object
 *
 * @description
 * This type extends the default Auth0 SessionData by adding an 'oauth' property
 * to the user object to track the specific OAuth method used for authentication.
 *
 * @remarks
 * - Inherits all properties from the original SessionData
 * - Adds an additional 'oauth' string property to the user object to identify the authentication provider
 *
 * @example
 * // Possible oauth values might include:
 * // - 'google'
 * // - 'github'
 * // - 'auth0'
 * // - 'microsoft'
 *
 * @see {@link SessionData} for the base session data structure
 */
export type FlowUpSessionData = SessionData & {
	user: SessionData["user"] & {
		/**
		 * Identifier for the OAuth provider used during authentication
		 *
		 * @type {string}
		 */
		oauth: string;
	};
};
