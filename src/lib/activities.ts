
const STORAGE_RESERVAS = "defider-reservas";
const STORAGE_TALLERES = "defider-inscripciones";

export type Reserva = {
  id: string;
  espacioId: string;
  espacio: string;
  fecha: string;
  hora: string;
  email: string;
};

export type Inscripcion = {
  id: string;
  tallerId: string;
  taller: string;
  horario: string;
  email: string;
};

// Obtener reservas guardadas
export function obtenerReservas(): Reserva[] {
  return JSON.parse(localStorage.getItem(STORAGE_RESERVAS) || "[]");
}

// Guardar una nueva reserva
export function guardarReserva(reserva: Reserva): void {
  const reservas = obtenerReservas();
  reservas.push(reserva);
  localStorage.setItem(STORAGE_RESERVAS, JSON.stringify(reservas));
}

// Cancelar una reserva
export function cancelarReserva(id: string): void {
  const reservas = obtenerReservas().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_RESERVAS, JSON.stringify(reservas));
}

// Obtener inscripciones guardadas
export function obtenerInscripciones(): Inscripcion[] {
  return JSON.parse(localStorage.getItem(STORAGE_TALLERES) || "[]");
}

// Inscribir a un taller
export function guardarInscripcion(inscripcion: Inscripcion): void {
  const inscripciones = obtenerInscripciones();
  inscripciones.push(inscripcion);
  localStorage.setItem(STORAGE_TALLERES, JSON.stringify(inscripciones));
}

// Cancelar una inscripción
export function cancelarInscripcion(id: string): void {
  const inscripciones = obtenerInscripciones().filter((i) => i.id !== id);
  localStorage.setItem(STORAGE_TALLERES, JSON.stringify(inscripciones));
}

// Contar las inscripciones activas de un taller
export function contarInscripciones(tallerId: string): number {
  return obtenerInscripciones().filter((i) => i.tallerId === tallerId).length;
}
