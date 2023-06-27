import { AuthContext } from "../context/AuthProvider";
import { AuthContextType } from "../types/AuthContextType";
import { useContext } from "react";

export const useAuth = (): Partial<AuthContextType> => useContext(AuthContext);
