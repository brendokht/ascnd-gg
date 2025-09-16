"use server";

// TODO: Either remove or update this as need be
/**
 *
 * @param route The route of the API to fetch. Must include a slash ("/") at the start
 * @returns The response type of the API route being fetched (any)
 */
export async function fetchApi(route: string) {
  const response = await fetch(`http://localhost:8080/v1${route}`);

  console.debug("response,", response);

  if (!response.ok) return null;

  if (response.status !== 200 && response.status !== 304) {
    return null;
  }

  const data = await response.json();

  return data;
}
