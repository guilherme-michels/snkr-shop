import {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import { useNavigate } from "react-router-dom";
import { Person } from "../interfaces/PersonInterface";

interface Auth {
  isAuthenticated: boolean;
  isLoading: boolean;
  position: string | null;
}

interface AuthContextProps {
  auth: Auth;
  login: (token: string, personId: string, position: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  auth: { isAuthenticated: false, isLoading: true, position: "" },
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [position, setPosition] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setLoading(false);
      setPosition(position);
    } else {
      setIsAuthenticated(false);
      setLoading(false);
      navigate("/authenticate");
    }
  }, []);

  const login = (token: string, personId: string, position: string) => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("position", position);
      localStorage.setItem("userId", personId);
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("position");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    navigate("/authenticate");
  };

  const auth = { isAuthenticated, isLoading, position, userId };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
