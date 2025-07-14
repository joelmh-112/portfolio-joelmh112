import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const host = context.request.headers.get("host") || "";
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Extraemos subdominio, limpiando el puerto si existe
  const subdomain = host.includes("localhost")
    ? host.split(".")[0].split(":")[0] // para quitar :4321 si está
    : host.split(".")[0];

  context.locals.subdomain = host.endsWith(".localhost") && subdomain !== "localhost"
    ? subdomain
    : null;

  // Si el subdominio es brain pero la ruta no empieza con /brain, redirige a /brain
  if (subdomain === "brain") {
    if (!pathname.startsWith("/brain")) {
      return Response.redirect(new URL("/brain", context.request.url), 302);
    }
  } else {
    // Si NO es subdominio brain y la ruta empieza con /brain, redirige sin aviso a la home ("/")
    if (pathname.startsWith("/brain")) {
      return Response.redirect(new URL("/", context.request.url), 302);
    }
  }

  return next();
});
