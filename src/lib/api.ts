export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`/api/${path.replace(/^\//, "")}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

  if (res.status === 204 || res.headers.get("content-length") === "0")
    return undefined as T;

  return res.json();
}
