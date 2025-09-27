import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Rutas from './routes/Rutas';
import { AuthProvider } from './hooks/useAuth.jsx';

function App() {
    return (
        <AuthProvider>
            <Rutas />
        </AuthProvider>
    );
}

export default App;
