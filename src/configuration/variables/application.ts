/**
 * Centralized configuration for application-wide variables
 *
 * @description
 * Provides a single source of truth for critical application-level configuration,
 * with a focus on environment-specific base URL management.
 *
 * @configuration
 * - Dynamically sets the base URL for the application
 * - Supports both production and development environments
 *
 * @environment
 * - Uses NEXT_PUBLIC_APP_BASE_URL environment variable for production/staging
 * - Defaults to localhost:3000 for local development
 *
 * @remarks
 * - Ensures consistent base URL across different parts of the application
 * - Facilitates easy configuration management
 * - Supports seamless environment switching
 *
 * @example
 * // In production (e.g., Vercel deployment)
 * NEXT_PUBLIC_APP_BASE_URL=https://yourapp.com
 *
 * // In local development
 * // No env var set, defaults to http://localhost:3000
 */
const ApplicationVariables = {
	/**
	 * Base URL for the application, used for routing and external links
	 *
	 * @type {string}
	 * @default "http://localhost:3000"
	 */
	baseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL || "http://localhost:3000",
};

export default ApplicationVariables;
