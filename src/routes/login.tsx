
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  head: () => ({
    meta: [
      { title: "Iniciar sesión · DEFIDER" },
      {
        name: "description",
        content: "Ingresa con tu cuenta USM para reservar e inscribirte.",
      },
      { property: "og:title", content: "Iniciar sesión · DEFIDER" },
      { property: "og:description", content: "Acceso estudiantes USM." },
    ],
  }),
  component: Login,
});

function Login() {
  const { redirect } = Route.useSearch();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    login(email.trim(), nombre.trim());

    const target =
      redirect && redirect.startsWith("/")
        ? redirect
        : "/perfil";

    navigate({ to: target, replace: true });
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-secondary px-4 py-16">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-lg border border-border bg-card p-8 shadow-sm"
      >
        <span className="mb-3 block h-1 w-10 bg-brand-red" />

        <h1 className="text-2xl font-bold text-primary">
          Iniciar sesión
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {redirect
            ? "Inicia sesión para continuar con tu solicitud."
            : "Ingresa con tu cuenta institucional."}
        </p>

        <label className="mt-6 block text-sm font-medium">
          Nombre completo
        </label>

        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. Camila González"
          required
          className="mt-1 w-full rounded-md border border-input px-3 py-2 text-sm outline-none focus:border-primary"
        />

        <label className="mt-4 block text-sm font-medium">
          Correo USM
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nombre@usm.cl"
          required
          className="mt-1 w-full rounded-md border border-input px-3 py-2 text-sm outline-none focus:border-primary"
        />

        <label className="mt-4 block text-sm font-medium">
          Contraseña
        </label>

        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
          className="mt-1 w-full rounded-md border border-input px-3 py-2 text-sm outline-none focus:border-primary"
        />

        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Ingresar
        </button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Acceso de demostración: puedes utilizar cualquier nombre,
          correo y contraseña.
        </p>
      </form>
    </div>
  );
}
