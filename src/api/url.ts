interface CustomFetchOptions extends Omit<RequestInit, "body"> {
  body?: BodyInit | Record<string, unknown>;
  params?: Record<string, string | number | boolean>;
}

export const customFetch = async (
  input: string,
  options: CustomFetchOptions = {},
  serverAccessToken?: string
): Promise<Response> => {
  const isClient = typeof window !== "undefined";
  const accessToken = isClient
    ? localStorage.getItem("accessToken")
    : serverAccessToken;

  const isFormData =
    typeof window !== "undefined" && options.body instanceof FormData;

  const headers = new Headers();
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  if (!isFormData) {
    headers.set("Content-Type", "application/json");
  }

  let body: BodyInit | undefined;
  if (isFormData) {
    body = options.body as FormData;
  } else if (options.body && typeof options.body === "object") {
    body = JSON.stringify(options.body);
  } else {
    body = options.body ?? undefined;
  }

  let url = `${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}${input}`;
  if (options.params) {
    const queryString = new URLSearchParams(
      Object.entries(options.params).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    url += `?${queryString}`;
  }

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body,
    credentials: "include",
  });

  if (res.status === 401 && isClient) {
    console.warn("[🔁 customFetch] 401 Unauthorized. Trying token refresh...");

    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_ARL_LOCAL_URL}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!refreshRes.ok) {
      console.error("[❌ customFetch] Token refresh failed.");
      throw new Error("세션이 만료되었습니다. 다시 로그인해주세요.");
    }

    const { accessToken: newToken } = await refreshRes.json();
    localStorage.setItem("accessToken", newToken);

    const newHeaders = new Headers();
    newHeaders.set("Authorization", `Bearer ${newToken}`);
    if (!isFormData) {
      newHeaders.set("Content-Type", "application/json");
    }

    return fetch(url, {
      method: options.method || "GET",
      headers: newHeaders,
      body,
      credentials: "include",
    });
  }

  return res;
};
