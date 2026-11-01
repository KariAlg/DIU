import { useNavigate, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth";

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <span className="mb-3 block h-1 w-10 bg-brand-red" />
        <h1 className="text-3xl font-bold text-primary md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-primary">
      <span className="h-6 w-1 bg-brand-red" /> {children}
    </h2>
  );
}

/** Button that requires login; sends user to /login and back afterwards. */
export function ProtectedAction({ children, onAction, disabled }: { children: ReactNode; onAction?: () => void; disabled?: boolean }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <button
      disabled={disabled}
      onClick={() => {
        if (!user) navigate({ to: "/login", search: { redirect: location.href } });
        else onAction?.();
      }}
      className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
    >
      {children}
    </button>
  );
}
