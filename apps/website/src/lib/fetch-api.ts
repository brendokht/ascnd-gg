// TODO: Either remove or update this as need be

/**
 *
 * @param route The route of the API to fetch. Must include a slash ("/") at the start
 * @returns The response type of the API route being fetched (any)
 */
export async function fetchApi(route: string) {
  const response = await fetch(`http://localhost:8080/v1${route}`, {
    credentials: "include",
  });

  if (!response.ok) return null;

  if (response.status !== 200 && response.status !== 304) {
    return null;
  }

  const data = await response.json();

  return data;
}

/**
 *
 * @param route The route of the API to post. Must include a slash ("/") at the start
 * @returns The response type of the API route being posted to (any)
 */
export async function postApi(
  route: string,
  body: unknown,
): Promise<false | unknown> {
  console.log("postApi: route =", route);
  console.log("postApi: body =", body);
  console.log("postApi: JSON.stringify(body) =", JSON.stringify(body));
  const response = await fetch(`http://localhost:8080/v1${route}`, {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  console.log("postApi: response =", response);

  if (!response.ok) return false;

  const responseObject = await response.json();

  console.log("postApi: responseObject =", responseObject);

  return responseObject;
}
