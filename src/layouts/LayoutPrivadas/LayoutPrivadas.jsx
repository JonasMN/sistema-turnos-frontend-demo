import { Suspense } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import styles from "./LayoutPrivadas.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Loader from "../../components/Loader/Loader";
import useModal from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";

export default function LayoutPrivadas() {
    const [isOpen, toggleOpen] = useModal();

    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    // Mostrar loader mientras validamos
    if (isLoading) {
        return (
            <div className={styles.layout} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Loader />
            </div>
        );
    }

    // Redirigir a login si no está autenticado
    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return (
        <div className={styles.layout}>
            <Navbar currentUser={{}} toggleOpen={toggleOpen} />
            <div className={styles["main-container"]}>
                <Sidebar isOpen={isOpen} />
                <main>
                    <Suspense fallback={<Loader />}>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
        </div>
    );
}
