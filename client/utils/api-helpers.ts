export const apiFetcher = async <TData>(url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (res.ok) {
    return res.json() as TData;
  }
  const errMsg = await res.text();
  throw new Error(errMsg);
};
