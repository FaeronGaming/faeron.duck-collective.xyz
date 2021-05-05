export type JsonResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export async function fetchApi<T>(
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { variables }: { variables?: Record<string, any> } = {}
): Promise<T | undefined> {
  const response = await fetch(process.env.GRAPHCMS_PROJECT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GRAPHCMS_DEV_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json: JsonResponse<T> = await response.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}
