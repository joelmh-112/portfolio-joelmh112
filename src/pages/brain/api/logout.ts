import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
  // Elimina la cookie del token
  cookies.delete("auth_token", { path: "/" });
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
