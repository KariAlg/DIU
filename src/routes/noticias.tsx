import { createFileRoute } from "@tanstack/react-router";
import { noticias } from "@/lib/data";
import { PageHeader } from "@/components/ui-blocks";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Noticias deportivas · DEFIDER" },
      { name: "description", content: "Noticias y novedades deportivas universitarias USM." },
      { property: "og:title", content: "Noticias deportivas · DEFIDER" },
      { property: "og:description", content: "Novedades deportivas universitarias." },
    ],
  }),
  component: Noticias,
});

function Noticias() {
  const first = noticias[0]!;
  const rest = noticias.slice(1);
  return (
    <>
      <PageHeader title="Noticias" subtitle="Novedades deportivas universitarias." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <article className="grid overflow-hidden rounded-lg border border-border bg-card md:grid-cols-2">
          <img src={first.imagen} alt="" className="h-64 w-full object-cover md:h-full" />
          <div className="p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-red">{first.categoria}</p>
            <h2 className="mt-2 text-2xl font-bold text-primary">{first.titulo}</h2>
            <p className="mt-3 text-muted-foreground">{first.resumen}</p>
            <p className="mt-4 text-sm text-muted-foreground">{first.fecha}</p>
          </div>
        </article>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {rest.map((n) => (
            <article key={n.id} className="overflow-hidden rounded-lg border border-border bg-card">
              <img src={n.imagen} alt="" loading="lazy" className="h-44 w-full object-cover" />
              <div className="p-5">
                <p className="text-xs text-muted-foreground">{n.categoria} · {n.fecha}</p>
                <h3 className="mt-2 font-bold leading-snug">{n.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.resumen}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
