
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, Users } from "lucide-react";
import { toast } from "sonner";
import { espacios } from "@/lib/data";
import {
  obtenerReservas,
  guardarReserva,
  type Reserva,
} from "@/lib/activities";
import { useAuth } from "@/lib/auth";
import { PageHeader } from "@/components/ui-blocks";

const PENDIENTE = "defider-pending-reserva";

function fechaLocal() {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

export const Route = createFileRoute("/reservas")({
  head: () => ({
    meta: [
      { title: "Reservas · DEFIDER" },
      {
        name: "description",
        content: "Reserva sala de musculatura, spinning, cancha de fútbol y tenis.",
      },
      { property: "og:title", content: "Reservas · DEFIDER" },
      { property: "og:description", content: "Reserva espacios deportivos USM." },
    ],
  }),
  component: Reservas,
});

function Reservas() {
  const { user } = useAuth();
  const [reservas, setReservas] = useState<Reserva[]>([]);

  // Cargar las reservas guardadas al entrar a la página.
  useEffect(() => {
    setReservas(obtenerReservas());
  }, []);

  // Recuperar una reserva que quedó pendiente por iniciar sesión.
  useEffect(() => {
    if (!user) return;

    const pendiente = localStorage.getItem(PENDIENTE);
    if (!pendiente) return;

    localStorage.removeItem(PENDIENTE);

    try {
      const datos = JSON.parse(pendiente);
      const espacio = espacios.find((e) => e.id === datos.espacioId);

      if (!espacio) return;

      const actuales = obtenerReservas();
      const numeros = espacio.capacidad.match(/\d+/g) || [];
      const capacidad = Number(numeros[numeros.length - 1] || 1);

      const ocupadas = actuales.filter(
        (r) =>
          r.espacioId === datos.espacioId &&
          r.fecha === datos.fecha &&
          r.hora === datos.hora
      ).length;

      if (ocupadas >= capacidad) {
        toast.error("Ese horario ya no tiene cupos disponibles.");
        return;
      }

      const nuevaReserva: Reserva = {
        id: crypto.randomUUID(),
        espacioId: datos.espacioId,
        espacio: espacio.nombre,
        fecha: datos.fecha,
        hora: datos.hora,
        email: user.email,
      };

      guardarReserva(nuevaReserva);
      setReservas(obtenerReservas());
      toast.success("¡Tu reserva se realizó correctamente!");
    } catch {
      toast.error("No se pudo recuperar tu solicitud.");
    }
  }, [user]);

  function reservar(
    espacioId: string,
    espacioNombre: string,
    fecha: string,
    hora: string
  ) {
    if (!user) return;

    const actuales = obtenerReservas();
    const numeros =
      espacios.find((e) => e.id === espacioId)?.capacidad.match(/\d+/g) || [];
    const capacidad = Number(numeros[numeros.length - 1] || 1);

    const ocupadas = actuales.filter(
      (r) =>
        r.espacioId === espacioId &&
        r.fecha === fecha &&
        r.hora === hora
    ).length;

    if (ocupadas >= capacidad) {
      toast.error("Ese horario ya no tiene cupos disponibles.");
      setReservas(actuales);
      return;
    }

    const repetida = actuales.some(
      (r) =>
        r.email === user.email &&
        r.espacioId === espacioId &&
        r.fecha === fecha &&
        r.hora === hora
    );

    if (repetida) {
      toast.error("Ya tienes una reserva para ese horario.");
      return;
    }

    const nuevaReserva: Reserva = {
      id: crypto.randomUUID(),
      espacioId,
      espacio: espacioNombre,
      fecha,
      hora,
      email: user.email,
    };

    guardarReserva(nuevaReserva);
    setReservas(obtenerReservas());
    toast.success("¡Tu reserva se realizó correctamente!");
  }

  return (
    <>
      <PageHeader
        title="Reservas"
        subtitle="Consulta horarios y reserva espacios deportivos."
      />

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-2">
        {espacios.map((e) => (
          <EspacioCard
            key={e.id}
            e={e}
            reservas={reservas}
            usuario={user?.email}
            onReservar={reservar}
          />
        ))}
      </div>
    </>
  );
}

function EspacioCard({
  e,
  reservas,
  usuario,
  onReservar,
}: {
  e: (typeof espacios)[number];
  reservas: Reserva[];
  usuario?: string | undefined;
  onReservar: (
    espacioId: string,
    espacioNombre: string,
    fecha: string,
    hora: string
  ) => void;
}) {
  const [bloque, setBloque] = useState<string | null>(null);
  const [fecha, setFecha] = useState(fechaLocal());
  const navigate = useNavigate();

  const numeros = e.capacidad.match(/\d+/g) || [];
  const capacidad = Number(numeros[numeros.length - 1] || 1);

  function cantidadReservas(hora: string) {
    return reservas.filter(
      (r) =>
        r.espacioId === e.id &&
        r.fecha === fecha &&
        r.hora === hora
    ).length;
  }

  function confirmarReserva() {
    if (!bloque) {
      toast.error("Primero debes seleccionar un horario.");
      return;
    }

    if (!usuario) {
      localStorage.setItem(
        PENDIENTE,
        JSON.stringify({
          espacioId: e.id,
          fecha,
          hora: bloque,
        })
      );

      navigate({
        to: "/login",
        search: { redirect: "/reservas" },
      });
      return;
    }

    onReservar(e.id, e.nombre, fecha, bloque);
  }

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      <img
        src={e.imagen}
        alt={e.nombre}
        loading="lazy"
        className="h-48 w-full object-cover"
      />

      <div className="p-6">
        <h2 className="text-xl font-bold text-primary">{e.nombre}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{e.descripcion}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            {e.horario}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            {e.capacidad}
          </span>
        </div>

        <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Selecciona una fecha
        </label>
        <input
          type="date"
          min={fechaLocal()}
          value={fecha}
          onChange={(event) => {
            setFecha(event.target.value);
            setBloque(null);
          }}
          className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />

        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Horarios disponibles
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {e.bloques.map((b) => {
            const ocupadas = cantidadReservas(b);
            const lleno = ocupadas >= capacidad;

            const esTuReserva = reservas.some(
              (r) =>
                r.email === usuario &&
                r.espacioId === e.id &&
                r.fecha === fecha &&
                r.hora === b
            );

            const deshabilitado = lleno || esTuReserva;

            let colores = "";

            if (esTuReserva) {
              colores = "border-red-600 bg-red-100 text-red-900 cursor-not-allowed";
            } else if (lleno) {
              colores = "border-red-600 bg-red-100 text-red-900 cursor-not-allowed";
            } else if (ocupadas > 0) {
              colores = "border-amber-400 bg-amber-100 text-amber-900 hover:bg-amber-200";
            } else {
              colores = "border-green-500 bg-green-100 text-green-900 hover:bg-green-200";
            }

            return (
              <button
                key={b}
                disabled={deshabilitado}
                onClick={() => setBloque(b)}
                className={`rounded-md border px-3 py-1.5 text-sm transition ${colores} ${
                  bloque === b ? "ring-2 ring-primary ring-offset-1" : ""
                }`}
              >
                {b}

                {esTuReserva
                  ? " · Tu reserva"
                  : lleno
                    ? " · Completo"
                    : ocupadas > 0
                      ? ` · ${capacidad - ocupadas} cupos`
                      : " · Disponible"}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-green-500 bg-green-100" />
            Disponible
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-amber-400 bg-amber-100" />
            Con reservas
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-red-600 bg-red-100" />
            Completo o reservado por ti
          </span>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          Los cupos se actualizan según las reservas registradas.
        </p>

        <button
          onClick={confirmarReserva}
          className="mt-5 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Reservar
        </button>
      </div>
    </article>
  );
}
