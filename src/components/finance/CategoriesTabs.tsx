import { useState } from "react";
import Trash from "@/components/ui/icons/Trash.tsx";
import { actions } from "astro:actions";
import type { Category } from "@/types/Category";

interface Props{
    grouped: Record<string, Category[]>;
    defaultTab: string;
}

export default function CategoriesTabs({ grouped, defaultTab }: Props) {
  // Calcula tabDates y defaultTab en SSR y cliente igual
  const tabDates = Object.keys(grouped).sort(); // Ordena para asegurar consistencia
  const [activeDate, setActiveDate] = useState(defaultTab);
  const [newGrouped, setNewGrouped] = useState(grouped);

  const handleDeleteCategory = (id) => async (event) => {
    event.preventDefault();
    if (confirm("¿Seguro que deseas eliminar esta categoría?")) {
      console.log('hacer peticion');
      const result = await actions.finance.deleteCategory({id} as any);
      if (result.error) {
        alert(`Error al eliminar la categoría: ${result.error}`);
      } else {
        // Elimina la categoría del estado local
        setNewGrouped((prev) => {
          const updated = { ...prev };
          updated[activeDate] = updated[activeDate].filter((cat) => cat.id !== id);
          return updated;
        });
      }
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {tabDates.map((date) => (
          <button
            key={date}
            type="button"
            className={`px-4 py-2 rounded bg-gray-800 text-white font-semibold hover:bg-primary transition-colors ${
              date === activeDate ? "bg-primary" : ""
            }`}
            onClick={() => setActiveDate(date)}
          >
            {date}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4 mb-8">
        {(newGrouped[activeDate] || []).map((category) => (
          <div key={category.id} className="bg-gray-900 bg-opacity-80 p-4 rounded-lg shadow-md flex justify-between items-center">
            <span className="text-white font-oswald">{category.name}</span>
            <div className="flex gap-2 items-center justify-center">
              <span className="text-primary font-bold">{category.percentage}%</span>
              <button type="submit" title="Eliminar categoría" onClick={handleDeleteCategory(category.id)}>
                <Trash className="text-red-500 w-4" />
              </button>
            </div>
          </div>
        ))}
        {(newGrouped[activeDate] || []).length === 0 && <p className="text-gray-500">Aún no existen categorías</p>}
      </div>
    </div>
  );
}
