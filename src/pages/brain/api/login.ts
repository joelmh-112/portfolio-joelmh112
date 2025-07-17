import type { APIRoute } from "astro";
import { API_URL } from "astro:env/client";

export const POST: APIRoute = async ({ request, cookies }) => {
  console.log("Processing login request...");
  const body = await request.json();
  const { email, code } = body;

  console.log("Login request:", { email, code });

  if (!email || !code) {
    return new Response(JSON.stringify({ error: "Email y código son requeridos" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Llamada a tu API externa para autenticar con código
  const res = await fetch(`${API_URL}/auth/login-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  if (!res.ok) {
    console.error("Login failed:", res.status, res.statusText);
    return new Response(JSON.stringify({ error: "Código inválido" }), {
      status: 401,
    });
  }

  const data = await res.json();

  console.log("Login successful:", data);

  // Guardar el token en cookie httpOnly
  cookies.set("auth_token", data.access_token, {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 semana
  });

  // Devolver solo el usuario (sin token)
  return new Response(JSON.stringify({ user: data.user }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
