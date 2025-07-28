export function getAuthTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .reduce((acc, curr) => {
      const [key, ...v] = curr.split("=");
      acc[key] = decodeURIComponent(v.join("="));
      return acc;
    }, {} as Record<string, string>);

  return cookies["auth_token"] ?? null;
}
