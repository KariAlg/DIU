import { createFileRoute } from "@tanstack/react-router";
import { Clock, User } from "lucide-react";
import { toast } from "sonner";
import { talleres } from "@/lib/data";
import { PageHeader, ProtectedAction } from "@/components/ui-blocks";

export const Route = createFileRoute("/talleres")({
  head: () => ({
    meta: [
      { title: "Talleres deportivos · DEFIDER" },
      { name: "description", content: "Inscríbete en talleres de vóleibol, handball, básquetbol, ping pong, fútbol y acondicionamiento físico." },
      { property: "og:title", content: "Talleres deportivos · DEFIDER" },
      { property: "og:description", content: "Talleres deportivos para estudiantes USM." },
    ],
  }),
  component: Talleres,
});

function Talleres() {
  return (
    <>
      <PageHeader title="Talleres deportivos" subtitle="Elige un taller y participa durante el semestre." />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {talleres.map((t) => {
          const lleno = t.inscritos >= t.cupos;
          const pct = Math.round((t.inscritos / t.cupos) * 100);
          return (
            <article key={t.id} className="flex flex-col rounded-lg border border-border bg-card p-6">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold text-primary">{t.nombre}</h2>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">{t.nivel}</span>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" />{t.horario}</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><User className="h-4 w-4" />{t.profesor}</p>
              <div className="mt-5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Cupos</span><span>{t.inscritos}/{t.cupos}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-muted">
                  <div className={`h-1.5 rounded-full ${lleno ? "bg-brand-red" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="mt-6 flex-1" />
              <ProtectedAction disabled={lleno} onAction={() => toast.success(`Inscripción enviada: ${t.nombre}`)}>
                {lleno ? "Sin cupos" : "Inscribirme"}
              </ProtectedAction>
            </article>
          );
        })}
      </div>
    </>
  );
}
