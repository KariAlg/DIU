import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Users } from "lucide-react";
import { toast } from "sonner";
import { espacios } from "@/lib/data";
import { PageHeader, ProtectedAction } from "@/components/ui-blocks";

export const Route = createFileRoute("/reservas")({
  head: () => ({
    meta: [
      { title: "Reservas · DEFIDER" },
      { name: "description", content: "Reserva sala de musculatura, spinning, cancha de fútbol y tenis." },
      { property: "og:title", content: "Reservas · DEFIDER" },
      { property: "og:description", content: "Reserva espacios deportivos USM." },
    ],
  }),
  component: Reservas,
});

function Reservas() {
  return (
    <>
      <PageHeader title="Reservas" subtitle="Consulta horarios y reserva espacios deportivos." />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-2">
        {espacios.map((e) => (
          <EspacioCard key={e.id} e={e} />
        ))}
      </div>
    </>
  );
}

function EspacioCard({ e }: { e: (typeof espacios)[number] }) {
  const [bloque, setBloque] = useState<string | null>(null);
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      <img src={e.imagen} alt={e.nombre} loading="lazy" className="h-48 w-full object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-bold text-primary">{e.nombre}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{e.descripcion}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" />{e.horario}</span>
          <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" />{e.capacidad}</span>
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bloques de hoy</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {e.bloques.map((b) => (
            <button
              key={b}
              onClick={() => setBloque(b)}
              className={`rounded-md border px-3 py-1.5 text-sm transition ${bloque === b ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
            >
              {b}
            </button>
          ))}
        </div>
        <div className="mt-5">
          <ProtectedAction onAction={() => toast.success(`Solicitud enviada: ${e.nombre}${bloque ? ` a las ${bloque}` : ""}`)}>
            Reservar
          </ProtectedAction>
        </div>
      </div>
    </article>
  );
}
