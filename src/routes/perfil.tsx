import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { CalendarDays, Dumbbell, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { misReservas, misTalleres } from "@/lib/data";
import { PageHeader } from "@/components/ui-blocks";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Mi perfil · DEFIDER" },
      { name: "description", content: "Tus reservas y talleres en DEFIDER." },
      { property: "og:title", content: "Mi perfil · DEFIDER" },
      { property: "og:description", content: "Tus reservas y talleres." },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  const { user, ready, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login", search: { redirect: "/perfil" }, replace: true });
  }, [ready, user, navigate]);

  if (!user) return <div className="py-20 text-center text-muted-foreground">Cargando…</div>;

  return (
    <>
      <PageHeader title="Mi perfil" />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <aside className="rounded-lg border border-border bg-card p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-display text-2xl font-bold text-primary-foreground">
            {user.nombre.split(" ").map((p) => p[0]).join("")}
          </div>
          <h2 className="mt-4 text-xl font-bold">{user.nombre}</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div><dt className="text-muted-foreground">Correo</dt><dd>{user.email}</dd></div>
            <div><dt className="text-muted-foreground">ROL</dt><dd>{user.rol}</dd></div>
            <div><dt className="text-muted-foreground">Carrera</dt><dd>{user.carrera}</dd></div>
          </dl>
          <button
            onClick={() => { logout(); navigate({ to: "/", replace: true }); }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold hover:border-brand-red hover:text-brand-red"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </aside>
        <div className="space-y-6 md:col-span-2">
          <section className="rounded-lg border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-primary"><CalendarDays className="h-5 w-5" /> Mis reservas</h3>
            <ul className="mt-4 divide-y divide-border">
              {misReservas.map((r) => (
                <li key={r.espacio + r.fecha} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-medium">{r.espacio}</span>
                  <span className="text-muted-foreground">{r.fecha} · {r.hora}</span>
                  <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">Confirmada</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-lg border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-primary"><Dumbbell className="h-5 w-5" /> Mis talleres</h3>
            <ul className="mt-4 divide-y divide-border">
              {misTalleres.map((t) => (
                <li key={t.taller} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-medium">{t.taller}</span>
                  <span className="text-muted-foreground">{t.horario}</span>
                  <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">Inscrito</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
