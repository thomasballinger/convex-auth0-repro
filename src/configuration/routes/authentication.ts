/**
 * Centralized configuration for authentication-related routes
 *
 * @description
 * Defines standardized routes for authentication flow management,
 * ensuring consistent navigation and handling of authentication states.
 *
 * @routes
 * - `login`: Entry point for user authentication
 *   - Includes a default return path to workspaces after successful login
 * - `logout`: Endpoint for terminating user session
 * - `callback`: OAuth provider callback handling route
 *
 * @workflow
 * 1. User initiates login via `/auth/login`
 * 2. Redirected to Auth0 authentication
 * 3. Successful authentication returns to `/auth/callback`
 * 4. User lands on workspaces or intended destination
 *
 * @security
 * - Centralized route management
 * - Consistent authentication state handling
 * - Predefined return paths
 *
 * @example
 * // Typical authentication navigation
 * window.location.href = AuthRoutes.login; // Starts login flow
 * // After authentication
 * window.location.href = AuthRoutes.logout; // Terminates session
 */
const AuthRoutes = {
	/**
	 * Login route with default workspace return path
	 * Enables seamless authentication and post-login navigation
	 *
	 * @type {string}
	 */
	login: "/auth/login?returnTo=/d/workspaces",

	/**
	 * Logout route for terminating user sessions
	 * Ensures clean session closure across the application
	 *
	 * @type {string}
	 */
	logout: "/auth/logout",

	/**
	 * Callback route for handling OAuth provider authentication responses
	 * Manages the final step of the authentication handshake
	 *
	 * @type {string}
	 */
	callback: "/auth/callback",
};

export default AuthRoutes;
