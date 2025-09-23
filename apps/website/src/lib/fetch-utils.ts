// TODO: Either remove or update this as need be

import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

/**
 *
 * @param route The route of the API to fetch. Must include a slash ("/") at the start
 * @param headers The headers for the request. Must be passed in when fetching from the server
 * @returns `null` if the response fails, else the JSON from the response
 */
export async function fetchApi(route: string, headers?: ReadonlyHeaders) {
  const response = await fetch(`http://localhost:8080/v1${route}`, {
    credentials: "include",
    headers: headers,
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
 * @param body The object/values to be passed into the body of the request
 * @param headers The headers for the request. Must be passed in when fetching from the server
 * @returns `false` if the response fails, else the returned JSON from the response
 */
export async function postApi(route: string, body: unknown, headers?: Headers) {
  console.log("postApi: route =", route);
  console.log("postApi: body =", body);
  console.log("postApi: JSON.stringify(body) =", JSON.stringify(body));

  headers?.append("Content-Type", "application/json");

  const response = await fetch(`http://localhost:8080/v1${route}`, {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
    headers: headers,
  });

  console.log("postApi: response =", response);

  if (!response.ok) return false;

  const responseObject = await response.json();

  console.log("postApi: responseObject =", responseObject);

  return responseObject;
}
