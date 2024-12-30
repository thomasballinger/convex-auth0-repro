import { auth0 } from "@/core/library/auth0";
import { redirect } from "next/navigation";
import Client from "./client";

export default async function Workspaces() {
	const session = await auth0.getSession();

	if (!session) {
		return (
			<main>
				<a href="/auth/login?screen_hint=signup">Sign up</a>
				<a href="/auth/login">Log in</a>
			</main>
		);
	}

	if (!session) {
		redirect("/auth/login");
	}

	return <Client />;
}
