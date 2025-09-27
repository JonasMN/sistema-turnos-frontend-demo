import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import Button from "../../components/Button/Button.jsx";
import FormField from "../../components/FormField/FormField.jsx";
import Box from "../../components/Box/Box.jsx";
import { toast } from "react-toastify";

import styles from "../ForgotPassword/ForgotPassword.module.scss";
import olvidePassword from "../../services/usuarios/olvidePassword.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await olvidePassword({ email });
      if (response.data?.estado === 0) {
        toast.error("No se encontró un usuario con este email.");
        setError(response.data?.mensaje || "No se pudo procesar la solicitud");
        return;
      }
      toast.success("Revisa tu correo para restablecer tu contraseña.");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    } catch (err) {
      const msg =
        err?.description ||
        err?.message ||
        "Error al solicitar restablecimiento.";
      toast.error(msg);
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`${styles.loginContainer} bgOrangeGradient`}>
      <div className={styles.loginCard}>
        <Box columns={1} padding={5} gap={5}>
          <h3 className={styles.loginTitle}>
            Restablecer contraseña
          </h3>
          
          <p className={styles.loginSubtitle}>
            Ingresá tu correo y recibirás un enlace para restablecer el acceso.
          </p>

          <form onSubmit={handleFormSubmit} className={styles.loginForm}>
            <FormField
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              placeholder="Correo electrónico"
              disabled={submitting}
            />

            <Button
              type="submit"
              variant="primary"
              size="medium"
              disabled={submitting}
            >
              {submitting ? "Enviando..." : "Enviar"}
            </Button>

            <div className={styles.loginLinks}>
              <p
                className={styles.back}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                  ← Volver al inicio de sesión
              </p>
            </div>
          </form>
        </Box>
      </div>
    </div>
  );
}
