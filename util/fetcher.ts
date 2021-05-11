export async function fetcher<T>(
  route: string,
  method = 'POST',
  fetchArgs = {}
): Promise<T> {
  const response = await fetch(route, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...fetchArgs,
  });

  if (response.status >= 400) {
    throw new Error(`Request to ${route} failed`);
  }

  const json: T = await response.json();
  return json;
}
