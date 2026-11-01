import { createFileRoute, Link } from "@tanstack/react-router";
import { Dumbbell, Bike, Trophy, CircleDot, ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { talleres, noticias } from "@/lib/data";
import { SectionTitle } from "@/components/ui-blocks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DEFIDER · Deportes USM" },
      { name: "description", content: "Reserva espacios deportivos, inscríbete en talleres y revisa noticias deportivas USM." },
      { property: "og:title", content: "DEFIDER · Deportes USM" },
      { property: "og:description", content: "Reserva espacios deportivos, inscríbete en talleres y revisa noticias deportivas USM." },
    ],
  }),
  component: Index,
});

const accesos = [
  { icon: Dumbbell, label: "Sala de musculatura" },
  { icon: Bike, label: "Sala de spinning" },
  { icon: Trophy, label: "Cancha de fútbol" },
  { icon: CircleDot, label: "Cancha de tenis" },
];

function Index() {
  return (
    <>
      <section className="relative">
        <img src={hero} alt="Estudiantes jugando vóleibol" width={1600} height={912} className="h-[440px] w-full object-cover md:h-[520px]" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-center px-4 text-primary-foreground">
          <span className="mb-4 block h-1 w-14 bg-brand-red" />
          <h1 className="max-w-2xl text-4xl font-bold md:text-6xl">El deporte USM, en un solo lugar</h1>
          <p className="mt-4 max-w-xl text-lg opacity-90">Reserva espacios, inscríbete en talleres y mantente al día con las noticias deportivas de la universidad.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/reservas" className="rounded-md bg-background px-6 py-3 font-semibold text-primary hover:bg-secondary">Reservar espacio</Link>
            <Link to="/talleres" className="rounded-md border border-primary-foreground px-6 py-3 font-semibold hover:bg-primary-foreground/10">Ver talleres</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle>Accesos rápidos</SectionTitle>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {accesos.map((a) => (
            <Link key={a.label} to="/reservas" className="group rounded-lg border border-border bg-card p-6 transition hover:border-primary hover:shadow-md">
              <a.icon className="h-8 w-8 text-primary" />
              <p className="mt-4 font-semibold">{a.label}</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary">Reservar <ArrowRight className="h-3 w-3" /></p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between">
            <SectionTitle>Talleres destacados</SectionTitle>
            <Link to="/talleres" className="mb-6 text-sm font-semibold text-primary">Ver todos →</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {talleres.slice(0, 3).map((t) => (
              <div key={t.id} className="rounded-lg border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.nivel}</p>
                <h3 className="mt-2 text-xl font-bold text-primary">{t.nombre}</h3>
                <p className="mt-2 text-sm">{t.horario}</p>
                <p className="text-sm text-muted-foreground">{t.profesor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between">
          <SectionTitle>Noticias recientes</SectionTitle>
          <Link to="/noticias" className="mb-6 text-sm font-semibold text-primary">Ver todas →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {noticias.slice(0, 3).map((n) => (
            <article key={n.id} className="overflow-hidden rounded-lg border border-border bg-card">
              <img src={n.imagen} alt="" loading="lazy" className="h-44 w-full object-cover" />
              <div className="p-5">
                <p className="text-xs text-muted-foreground">{n.categoria} · {n.fecha}</p>
                <h3 className="mt-2 font-bold leading-snug">{n.titulo}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
