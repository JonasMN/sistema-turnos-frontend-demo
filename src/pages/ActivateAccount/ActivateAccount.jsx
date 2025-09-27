import { useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import Button from "../../components/Button/Button.jsx";
import FormField from "../../components/FormField/FormField.jsx";
import Box from "../../components/Box/Box.jsx";

import { toast } from "react-toastify";
import styles from "../ActivateAccount/ActivateAccount.module.scss";
import activateAccount from "../../services/login/activate-account.js";

export default function ActivateAccount() {
    let { hash } = useParams();
    const location = useLocation();
    const [repeatPassword, setRepeatPassword] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    if (!hash) {
        return <Navigate to='/login' replace state={{ from: location }} />;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            toast.error("Las contraseñas no coinciden");
            setError("Las contraseñas no coinciden");
            return;
        }
        setSubmitting(true);
        setError(null);
        

        try {
            const params = {
                repeatPassword,
                password,
                hash
            };
            const response = await activateAccount(params);
            if (response.data?.estado === 0) {
                toast.error(response.data?.mensaje || response.data?.description || "No se pudo activar tu cuenta");
                setError(response.data?.mensaje || response.data?.description || "No se pudo activar tu cuenta");
                return;
            }
            toast.success("¡Bienvenido! Redirigiendo...");
            setTimeout(() => {
                navigate('/login', { replace: true });
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
        <div className={`${styles.loginContainer} bgOrangeGradient`} >
            <div className={styles.loginCard}>
                <Box columns={1} padding={5} gap={5}>
                    <h3 className={styles.loginTitle}>Verifica tu cuenta</h3>
                    <form onSubmit={handleFormSubmit} className={styles.loginForm}>
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
                        <FormField
                            label="Confirmar contraseña"
                            name="verifiy_password"
                            type="password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            required={true}
                            placeholder="Confirmar contraseña"
                            disabled={submitting}
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="medium"
                            disabled={submitting}
                        >
                            {submitting ? 'ACTUALIZANDO DATOS...' : 'Enviar'}
                        </Button>
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