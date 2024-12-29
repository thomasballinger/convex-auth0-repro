/**
 * Parses an Auth0 user.sub string into a more usable format.
 * The sub string is in the format of "provider|id", e.g. "github1234567890"
 *
 * @param {string} sub The Auth0 user.sub string to be parsed
 *
 * @returns {{id: string, provider: string, formattedId: string}} An object with three properties:
 *   - id: The user id
 *   - provider: The provider name
 *   - formattedId: The provider and id joined by a dash
 *
 * @example
 * const sub = "github|1234567890";
 * const { id, provider, formattedId } = parseAuth0Sub(sub);
 * console.log(id); // "1234567890"
 * console.log(provider); // "github"
 * console.log(formattedId); // "github-1234567890"
 */
export function parseAuth0Sub(
	sub: string,
	separator: string = "-",
): {
	id: string;
	provider: string;
	formattedId: string;
} {
	return {
		id: sub.split("|")[1],
		provider: sub.split("|")[0],
		formattedId: `${sub.split("|")[0]}${separator}${sub.split("|")[1]}`,
	};
}
