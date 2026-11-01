
import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DEFIDER · Deportes USM" },
      {
        name: "description",
        content:
          "Reserva espacios deportivos, inscríbete en talleres y revisa noticias deportivas USM.",
      },
      { property: "og:title", content: "DEFIDER · Deportes USM" },
      {
        property: "og:description",
        content:
          "Reserva espacios deportivos, inscríbete en talleres y revisa noticias deportivas USM.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <section className="relative">
      {/* Imagen principal */}
      <img
        src={hero}
        alt="Estudiantes jugando vóleibol"
        width={1600}
        height={912}
        className="h-[440px] w-full object-cover brightness-78 md:h-[520px]"
      />

      {/* Capa azul sobre la imagen */}
      <div className="absolute inset-0 bg-primary/87" />

      {/* Texto y botones */}
      <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-center px-4 text-white">
        <span className="mb-4 block h-1 w-14 bg-[#fcb100]" />

        <h1 className="max-w-2xl text-4xl font-extrabold drop-shadow-lg md:text-6xl">
          Portal de Deportes
        </h1>
        <h1 className="max-w-2xl text-4xl font-extrabold drop-shadow-lg md:text-6xl">
          USM
        </h1>

        <p className="mt-4 max-w-xl text-lg font-medium text-white drop-shadow-md md:text-xl">
          Reserva espacios, inscríbete en talleres y mantente al día con las
          noticias deportivas de la universidad.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/reservas"
            className="rounded-md bg-[#fcb100] px-6 py-3 font-semibold text-[#072f49] shadow-md transition hover:bg-[#e5a000]"
          >
            Reservar espacio
          </Link>

          <Link
            to="/talleres"
            className="rounded-md border border-white bg-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            Ver talleres
          </Link>
        </div>
      </div>
    </section>
  );
}
