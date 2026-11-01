
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Inicio de sesión simulado, guardado en localStorage.
export type Student = {
  nombre: string;
  email: string;
  rol: string;
  carrera: string;
};

type AuthCtx = {
  user: Student | null;
  ready: boolean;
  login: (email: string, nombre: string) => void;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "defider-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Student | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);

    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(KEY);
      }
    }

    setReady(true);
  }, []);

  const login = (email: string, nombre: string) => {
    const u: Student = {
      nombre,
      email,
      rol: "No informado",
      carrera: "No informada",
    };

    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, ready, login, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);

  if (!c) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return c;
}
