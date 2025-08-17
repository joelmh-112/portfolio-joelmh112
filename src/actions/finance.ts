import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import type { Category } from "@/types/Category";
import { getAuthTokenFromRequest } from "@/utils/auth";
import { API_URL } from "astro:env/client";
import { start } from "@astrojs/vercel/entrypoint";

export const finance = {
  createCategory: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(1, "El nombre es obligatorio"),
      percentage: z.number().min(1, "El porcentaje debe ser al menos 1").max(100, "El porcentaje no puede ser mayor a 100"),
      startDate: z.string().min(1, "La fecha de inicio es obligatoria"),
    }),
    handler: async (input, { request }) => {
      const token = getAuthTokenFromRequest(request);
      if (!token) {
        throw new Error("No estás autenticado");
      }

      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al crear la categoría");
      }

      const category: Category = await res.json();
      return category;
    },
  }),
  deleteCategory: defineAction({
    input: z.object({
      id: z.string().uuid("ID inválido"),
    }),
    handler: async (input, { request }) => {
      console.log('action delete')
      const token = getAuthTokenFromRequest(request);
      if (!token) {
        throw new Error("No estás autenticado");
      }

      const res = await fetch(`${API_URL}/categories/${input.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al eliminar la categoría");
      }

      return { success: true };
    }
  }),
};
