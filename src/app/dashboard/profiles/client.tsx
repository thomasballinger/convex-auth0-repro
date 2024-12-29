"use client";

import { useUser } from "@auth0/nextjs-auth0";

export default function Client() {
	const { user, isLoading, error } = useUser();

	if (isLoading) return <div>Loading...</div>;

	return <div>{JSON.stringify(user)}</div>;
}
