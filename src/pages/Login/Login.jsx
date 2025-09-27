import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import Button from "../../components/Button/Button.jsx";
import FormField from "../../components/FormField/FormField.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Box from "../../components/Box/Box.jsx";
import { RefreshCw   } from 'lucide-react';

import { toast } from "react-toastify";
import styles from "./Login.module.scss";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";    // Función para manejar el formulario con componentes React

    if (isAuthenticated) {
        return <Navigate to={from} replace state={{ from: location }} />;
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const params = {
                email,
                password,
            };
            await login(params);
            toast.success("¡Bienvenido! Redirigiendo...");
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 800);
        } catch (err) {
            const msg = err?.description || err?.message || "No se pudo iniciar sesión.";
            toast.error(msg);
            setError(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
      <div className={`${styles.loginContainer} bgOrangeGradient`}>
        {isLoading && <Loader />}
        <div className={styles.loginCard}>
          <Box columns={1} padding={5} gap={5}>
            <h3 className={styles.loginTitle}>Ingresar</h3>
            
            <form onSubmit={handleFormSubmit} className={styles.loginForm}>
              <FormField
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                placeholder="Ingresa tu email"
                disabled={submitting}
              />

              <FormField
                label="Contraseña"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                placeholder="Ingresa tu contraseña"
                disabled={submitting}
              />

              <Button
                type="submit"
                variant="primary"
                size="medium"
                disabled={submitting}
              >
                {submitting ? "INICIANDO SESIÓN..." : "INICIAR SESIÓN"}
              </Button>


              <span className={styles.forgotPassword} onClick={() => navigate('/forgot-password', { replace: true })}>¿Olvidaste tu contraseña?</span>
            </form>

            {submitting && (
              <div className={styles.submittingOverlay}>
                <Loader />
                <p>Verificando credenciales...</p>
              </div>
            )}
          </Box>
        </div>
      </div>
    );

}
