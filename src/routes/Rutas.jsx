import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "../components/Loader/Loader.jsx";
import config from '../config/config.js';
import Login from "../pages/Login/Login.jsx";
import ActivateAccount from "../pages/ActivateAccount/ActivateAccount.jsx";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword.jsx";

const LayoutPrivadas = lazy(() => import("../layouts/LayoutPrivadas/LayoutPrivadas.jsx"));

const routesConfig = [
    { path: "locaciones", component: lazy(() => import('../pages/Locaciones/Locaciones.jsx')) },
    { path: "agenda", component: lazy(() => import('../pages/Agenda/Agenda.jsx')) },
    { path: "configuraciones", component: lazy(() => import('../pages/Configuraciones/Configuraciones.jsx')) },
    { path: "turnos", component: lazy(() => import('../pages/Turnos/Turnos.jsx')) },
    { path: "usuarios", component: lazy(() => import('../pages/Usuarios/Usuarios.jsx')) },
];

export default function Rutas() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/activate-account/:hash" element={<ActivateAccount />} />
                    <Route path="/forgot-password/" element={<ForgotPassword />} />
                    <Route path="/" element={<LayoutPrivadas />}>
                        {routesConfig.map(({ path, component: Component }) => (
                            <Route key={path} path={path} element={<Component />} />
                        ))}
                    </Route>
                </Routes>
            </Suspense>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </BrowserRouter>
    );
}
