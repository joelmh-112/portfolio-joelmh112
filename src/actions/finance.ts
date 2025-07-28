import { defineAction } from "astro:actions";
import {z}from "astro:schema";
import type { Category } from "@/types/Category";

export const finance = {
    createCategory: defineAction({
        input: z.object({
            name: z.string().min(1, "El nombre es obligatorio"),
            percentage: z.number().min(1, "El porcentaje debe ser al menos 1").max(100, "El porcentaje no puede ser mayor a 100"),
        }),
        handler: async (input,{request}) => {
            const token = request.headers.get("coo")
            if (!token) {
                throw new Error("No estás autenticado");
            }

            const res = await fetch(`${import.meta.env.PUBLIC_API_URL}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(input),
            });

            if (!res.ok) {
                throw new Error("Error al crear la categoría");
            }

            const category: Category = await res.json();
            return category;
        }
    }),

}