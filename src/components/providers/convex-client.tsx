"use client";

import ConvexVariables from "@/configuration/variables/convex";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { useCustomAuthFromAuth0 } from "./convex-auth0";

/**
 * Creates a Convex React client instance using the project-specific URL
 *
 * @remarks
 * - Initializes the Convex client with the URL from environment configuration
 * - Used to establish a connection to the Convex backend
 */
const convex = new ConvexReactClient(ConvexVariables.url);

/**
 * A React provider component that wraps the application with Convex client context
 *
 * @description
 * This component enables Convex functionality throughout the React component tree
 * by providing the Convex client context to all child components.
 *
 * @param {Object} props - Component properties
 * @param {ReactNode} props.children - Child components to be wrapped with Convex provider
 *
 * @returns {JSX.Element} A ConvexProvider component with the initialized Convex client
 *
 * @example
 * // Typical usage in a layout or app component
 * export default function RootLayout({ children }) {
 *   return (
 *     <ConvexClientProvider>
 *       {children}
 *     </ConvexClientProvider>
 *   )
 * }
 */
export default function ConvexClientProvider({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<ConvexProviderWithAuth
			client={convex}
			useAuth={useCustomAuthFromAuth0}
		>
			{children}
		</ConvexProviderWithAuth>
	);
}
