import { getAccessToken, useUser } from "@auth0/nextjs-auth0";
import { useCallback, useMemo } from "react";

/**
 * Custom authentication hook that provides a simplified interface for Auth0 authentication
 *
 * @description
 * Wraps Auth0's authentication utilities to provide a consistent and easy-to-use
 * authentication state management solution for React components.
 *
 * @returns {Object} An object containing authentication state and utilities
 * @property {boolean} isLoading - Indicates if the authentication state is being resolved
 * @property {boolean} isAuthenticated - Indicates if a user is currently authenticated
 * @property {() => Promise<string | null>} fetchAccessToken - Method to retrieve the current access token
 *
 * @workflow
 * 1. Retrieves current user state from Auth0
 * 2. Provides methods to check authentication status
 * 3. Offers a safe way to fetch access tokens
 *
 * @remarks
 * - Memoizes the return value for performance optimization
 * - Gracefully handles token retrieval failures
 * - Provides a simple, consistent authentication interface
 *
 * @example
 * function MyComponent() {
 *   const { isAuthenticated, isLoading, fetchAccessToken } = useCustomAuthFromAuth0();
 *
 *   if (isLoading) return <LoadingSpinner />;
 *   if (!isAuthenticated) return <LoginPrompt />;
 *
 *   const token = await fetchAccessToken();
 *   // Use token for authenticated requests
 * }
 *
 * @see {@link useUser} From @auth0/nextjs-auth0 for underlying user retrieval
 * @see {@link getAccessToken} From @auth0/nextjs-auth0 for access token management
 */
export function useCustomAuthFromAuth0() {
	const { user, isLoading } = useUser();
	const idToken = user?.idToken;

	/**
	 * Safely fetches the current access token
	 *
	 * @returns {Promise<string | null>} The access token or null if retrieval fails
	 */
	const fetchAccessToken = useCallback(async () => {
		try {
			// maybe the side effect of getAccessToken
			// will include updating the idToken?
			void (await getAccessToken());
			return idToken;
		} catch {
			return null;
		}
	}, [getAccessToken, idToken]);

	/**
	 * Memoized authentication state object
	 * Optimizes performance by only re-computing when dependencies change
	 */
	return useMemo(() => {
		return {
			isLoading,
			isAuthenticated: !!user,
			fetchAccessToken,
		};
	}, [isLoading, user, fetchAccessToken]);
}
