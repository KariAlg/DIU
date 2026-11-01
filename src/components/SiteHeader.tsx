import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/lib/auth";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/reservas", label: "Reservas" },
  { to: "/talleres", label: "Talleres" },
  { to: "/noticias", label: "Noticias" },
  { to: "/perfil", label: "Mi perfil" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const linkCls = "px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors";
  const activeCls = "text-primary border-b-2 border-brand-red";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="h-1 bg-primary" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground">D</span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-wide text-primary">DEFIDER</span>
            <span className="block text-[11px] text-muted-foreground">Deportes USM</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className={linkCls} activeProps={{ className: activeCls }} activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          {user ? (
            <Link to="/perfil" className="flex items-center gap-2 text-sm font-medium text-primary">
              <User className="h-4 w-4" /> {user.nombre.split(" ")[0]}
            </Link>
          ) : (
            <Link to="/login" className="rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              Iniciar sesión
            </Link>
          )}
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-border px-4 py-2 md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 text-sm font-medium" activeProps={{ className: "text-primary" }} activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
          {!user && (
            <Link to="/login" onClick={() => setOpen(false)} className="py-3 text-sm font-semibold text-primary">Iniciar sesión</Link>
          )}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm md:flex-row md:justify-between">
        <p className="font-display font-semibold tracking-wide">DEFIDER · Universidad Técnica Federico Santa María</p>
        <p className="opacity-80">Plataforma deportiva estudiantil</p>
      </div>
    </footer>
  );
}
