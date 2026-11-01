import gym from "@/assets/gym.jpg";
import courts from "@/assets/courts.jpg";
import cancha from "@/assets/cancha.jpg";
import spinning from "@/assets/spinning.jpg";
import hero from "@/assets/hero.jpg";

export type Espacio = {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  capacidad: string;
  horario: string;
  bloques: string[];
};

export const espacios: Espacio[] = [
  {
    id: "gimnasio",
    nombre: "Sala de musculatura",
    descripcion: "Máquinas, pesos libres y zona de entrenamiento funcional.",
    imagen: gym,
    capacidad: "25 personas por bloque",
    horario: "Lun a Vie · 08:00 – 21:00",
    bloques: ["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30"],
  },
  {
    id: "spinning",
    nombre: "Sala de spinning",
    descripcion: "Clases guiadas y uso libre de bicicletas estáticas.",
    imagen: spinning,
    capacidad: "20 bicicletas",
    horario: "Lun a Vie · 07:30 – 20:00",
    bloques: ["07:30", "12:00", "13:00", "17:30", "18:30"],
  },
  {
    id: "futbol",
    nombre: "Cancha de fútbol",
    descripcion: "Cancha de pasto sintético para partidos y entrenamientos.",
    imagen: cancha,
    capacidad: "Hasta 22 jugadores",
    horario: "Lun a Sáb · 09:00 – 22:00",
    bloques: ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00"],
  },
  {
    id: "tenis",
    nombre: "Cancha de tenis",
    descripcion: "Superficie dura, iluminación nocturna.",
    imagen: courts,
    capacidad: "2 a 4 jugadores",
    horario: "Lun a Sáb · 08:00 – 21:00",
    bloques: ["08:00", "09:00", "10:00", "16:00", "17:00", "18:00", "19:00"],
  },
];

export type Taller = {
  id: string;
  nombre: string;
  nivel: string;
  horario: string;
  profesor: string;
  cupos: number;
  inscritos: number;
};

export const talleres: Taller[] = [
  { id: "voleibol", nombre: "Vóleibol", nivel: "Todos los niveles", horario: "Mar y Jue · 18:00 – 19:30", profesor: "Prof. Camila Rojas", cupos: 24, inscritos: 18 },
  { id: "handball", nombre: "Handball", nivel: "Inicial", horario: "Lun y Mié · 17:00 – 18:30", profesor: "Prof. Diego Muñoz", cupos: 20, inscritos: 11 },
  { id: "basquetbol", nombre: "Básquetbol", nivel: "Intermedio", horario: "Mar y Vie · 19:00 – 20:30", profesor: "Prof. Andrés Soto", cupos: 20, inscritos: 20 },
  { id: "pingpong", nombre: "Ping pong", nivel: "Todos los niveles", horario: "Mié · 13:00 – 14:30", profesor: "Prof. Valentina Pérez", cupos: 16, inscritos: 9 },
  { id: "futbol", nombre: "Fútbol", nivel: "Todos los niveles", horario: "Lun y Jue · 19:00 – 20:30", profesor: "Prof. Matías González", cupos: 30, inscritos: 26 },
  { id: "acondicionamiento", nombre: "Acondicionamiento físico", nivel: "Inicial", horario: "Lun, Mié y Vie · 08:00 – 09:00", profesor: "Prof. Fernanda Díaz", cupos: 25, inscritos: 14 },
];

export type Noticia = {
  id: string;
  titulo: string;
  resumen: string;
  fecha: string;
  categoria: string;
  imagen: string;
};

export const noticias: Noticia[] = [
  { id: "1", titulo: "Selección de vóleibol clasifica a la fase final del torneo universitario", resumen: "El equipo cerró la fase regular invicto y disputará el título en las próximas semanas.", fecha: "28 oct 2026", categoria: "Selecciones", imagen: hero },
  { id: "2", titulo: "Abren inscripciones para talleres del segundo semestre", resumen: "Los estudiantes ya pueden inscribirse en los seis talleres deportivos disponibles.", fecha: "24 oct 2026", categoria: "Talleres", imagen: spinning },
  { id: "3", titulo: "Nuevo horario extendido en la sala de musculatura", resumen: "Desde noviembre, la sala funcionará hasta las 21:00 horas de lunes a viernes.", fecha: "20 oct 2026", categoria: "Espacios", imagen: gym },
  { id: "4", titulo: "Torneo interno de tenis: resultados de la primera fecha", resumen: "Más de 40 estudiantes participaron en la jornada inaugural del campeonato.", fecha: "15 oct 2026", categoria: "Torneos", imagen: courts },
];

export const misReservas = [
  { espacio: "Sala de musculatura", fecha: "Lun 3 nov", hora: "17:00" },
  { espacio: "Cancha de tenis", fecha: "Mié 5 nov", hora: "18:00" },
];

export const misTalleres = [{ taller: "Vóleibol", horario: "Mar y Jue · 18:00 – 19:30" }];
