import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { type ApiErrorType } from "@ascnd-gg/types";

/**
 *
 * @param route The route of the API to fetch. Must include a slash ("/") at the start
 * @param headers The headers for the request. Must be passed in when fetching from the server
 * @returns `{data, error}`, where data is either `T` or `null`, and error is either `null` or `ApiErrorType`
   @example 
   const { data: teams, error } = await fetchApi<Array<UserTeamViewModel>>(
     "/me/teams",
     await headers(),
   );

   if (error) {
     return <>Something went wrong</>;
   }
  */
export async function fetchApi<T>(
  route: string,
  headers?: ReadonlyHeaders,
): Promise<
  { data: T | null; error: null } | { data: null; error: ApiErrorType }
> {
  const response = await fetch(`http://localhost:8080/v1${route}`, {
    credentials: "include",
    headers: headers,
  });

  if (!response.ok) {
    if (response.status === 404) {
      return { data: null, error: null };
    }
    const errorObject: ApiErrorType = await response.json();
    return { data: null, error: errorObject };
  }

  const data = await response.json();

  return { data: data, error: null };
}

/**
 *
 * @param route The route of the API to post. Must include a slash ("/") at the start
 * @param body The object/values to be passed into the body of the request
 * @param contentType The content-type to be added to the headers
 * @param headers The headers for the request. Must be passed in when fetching from the server
 * @returns `{data, error}`, where data is either `T` or `null`, and error is either `null` or `ApiErrorType`
   @example 
   const { data, error } = await postApi<{ name: string }>("/team", values);

   if (error) {
     if (error.statusCode === 409)
      form.setError("displayName", { message: error.message });
     else form.setError("root", { message: error.message });
     return;
   }

   if (!data) {
     form.setError("root", {
       message: "Something went wrong. Please try again.",
     });
     return;
   }
*/
export async function postApi<T>(
  route: string,
  body: BodyInit,
  contentType?: string,
  headers?: Headers,
): Promise<
  { data: T | null; error: null } | { data: null; error: ApiErrorType }
> {
  if (!headers) {
    headers = new Headers();
  }

  if (contentType) headers.append("Content-Type", contentType);

  const response = await fetch(`http://localhost:8080/v1${route}`, {
    method: "POST",
    body: body,
    credentials: "include",
    headers: headers,
  });

  if (!response.ok) {
    const errorObject: ApiErrorType = await response.json();
    return { data: null, error: errorObject };
  }

  const responseObject: T = await response.json();

  return { data: responseObject, error: null };
}

/**
 *
 * @param route The route of the API to post. Must include a slash ("/") at the start
 * @param body The object/values to be passed into the body of the request
 * @param contentType The content-type to be added to the headers
 * @param headers The headers for the request. Must be passed in when fetching from the server
 * @returns `{data, error}`, where data is either `T` or `null`, and error is either `null` or `ApiErrorType`
   @example 
   const { data, error } = await putApi<{ name: string }>("/team", values);

   if (error) {
     if (error.statusCode === 409)
      form.setError("displayName", { message: error.message });
     else form.setError("root", { message: error.message });
     return;
   }

   if (!data) {
     form.setError("root", {
       message: "Something went wrong. Please try again.",
     });
     return;
   }
*/
export async function putApi<T>(
  route: string,
  body: BodyInit,
  contentType?: string,
  headers?: Headers,
): Promise<
  { data: T | null; error: null } | { data: null; error: ApiErrorType }
> {
  if (!headers) {
    headers = new Headers();
  }

  if (contentType) headers.append("Content-Type", contentType);

  const response = await fetch(`http://localhost:8080/v1${route}`, {
    method: "PUT",
    body: body,
    credentials: "include",
    headers: headers,
  });

  if (!response.ok) {
    const errorObject: ApiErrorType = await response.json();
    return { data: null, error: errorObject };
  }

  const responseObject: T = await response.json();

  return { data: responseObject, error: null };
}
