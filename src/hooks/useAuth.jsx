import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
// COMENTADO PARA MODO DEMO - NO USAR APIs REALES
// import loginService from "../services/login/login.js";
// import logoutService from "../services/login/logout.js";
// import validateToken from "../services/login/validate-token.js";
import { mockAuthUser } from "../mocks/mockData.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => {
        return localStorage.getItem('authToken');
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // MODO DEMO: Función para validar token existente
    const validateCurrentToken = useCallback(async () => {
        const currentToken = token || localStorage.getItem('authToken');
        if (!currentToken) {
            setIsAuthenticated(false);
            setUser(null);
            return false;
        }
        
        try {
            setIsLoading(true);
            // MODO DEMO: Verificar que el token sea el token demo válido
            if (currentToken === mockAuthUser.token) {
                const userData = {
                    userId: mockAuthUser.id,
                    userFullName: `${mockAuthUser.nombre} ${mockAuthUser.apellido}`
                };
                setUser(userData);
                setIsAuthenticated(true);
                if (!token) setToken(currentToken);
                return true;
            } else {
                // Token inválido, limpiar estado
                setUser(null);
                setIsAuthenticated(false);
                setToken(null);
                localStorage.removeItem('authToken');
                return false;
            }
        } catch (error) {
            console.error("Error validating token:", error);
            setUser(null);
            setIsAuthenticated(false);
            setToken(null);
            localStorage.removeItem('authToken');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [token]);


    // MODO DEMO: Verificar token existente al inicio (sin auto-login)
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (!storedToken) {
            setIsAuthenticated(false);
            setUser(null);
            setIsLoading(false);
            return;
        }
        // Solo validar si hay un token guardado
        validateCurrentToken();
    }, [validateCurrentToken]);

    const login = useCallback(async ({ email, password }) => {
        // COMENTADO - LÓGICA ORIGINAL DE API
        // try {
        //     const response = await loginService({ email, password });
        //     if (!response.data?.userId) {
        //         throw new Error(response.data?.description || "Error al iniciar sesión. Inténtalo de nuevo.");
        //     }
        //     const { userId, userFullName, token } = response.data;
        //     const userData = {
        //         userId,
        //         userFullName
        //     };
        //     setToken(token);
        //     localStorage.setItem('authToken', token);
        //     return userData;
        // } catch (error) {
        //     console.error("Error en login:", error);
        //     throw error;
        // }
        
        // MODO DEMO: Simular login exitoso (acepta cualquier email/password)
        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const userData = {
                userId: mockAuthUser.id,
                userFullName: `${mockAuthUser.nombre} ${mockAuthUser.apellido}`
            };
            
            const demoToken = mockAuthUser.token;
            setToken(demoToken);
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', demoToken);
            
            return userData;
        } catch (error) {
            console.error("Error en login demo:", error);
            throw error;
        }
    }, []);

    const logout = useCallback(async (clientId = null) => {
        // COMENTADO - LÓGICA ORIGINAL DE API
        // try {
        //     await logoutService(clientId);
        // } catch (error) {
        //     console.error("Error during logout:", error);
        // } finally {
        //     setUser(null);
        //     setIsAuthenticated(false);
        //     setToken(null);
        //     localStorage.removeItem('authToken');
        // }
        
        // MODO DEMO: Simular logout
        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error("Error during logout demo:", error);
        } finally {
            // Siempre limpiar el estado local
            setUser(null);
            setIsAuthenticated(false);
            setToken(null);
            localStorage.removeItem('authToken');
        }
    }, []);

    const value = useMemo(
        () => ({ user, login, logout, isAuthenticated, isLoading }),
        [user, isAuthenticated, isLoading, login, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
