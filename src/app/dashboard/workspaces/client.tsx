"use client";

import { useUser } from "@auth0/nextjs-auth0";
import {
	Authenticated,
	AuthLoading,
	Unauthenticated,
	useConvexAuth,
	useQuery,
} from "convex/react";
import { api } from "../../../../convex/_generated/api";

function Tasks() {
	const tasks = useQuery(api.tasks.get);

	return (
		<div>{tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}</div>
	);
}

export default function Client() {
	const { user, isLoading, error } = useUser();
	const auth = useConvexAuth();

	if (isLoading) return <div>Loading...</div>;

	// console.log("AUTH FROM CLIENT PAGE:", auth)

	return (
		<div className="flex flex-col gap-10">
			{JSON.stringify(user)}

			<Authenticated>
				<div>
					You are authenticated
					<Tasks />
				</div>
			</Authenticated>

			<Unauthenticated>
				<div>You are not authenticated</div>
			</Unauthenticated>

			<AuthLoading>
				<div>Loading auth...</div>
			</AuthLoading>
		</div>
	);
}
