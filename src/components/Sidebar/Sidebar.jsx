import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { House, Settings, Notebook, CalendarClock, Users } from 'lucide-react';
import ListGroup from 'react-bootstrap/ListGroup';

const Sidebar = ({ isOpen }) => {
  const links = [
    { name: 'Agenda', path: '/agenda', icon: Notebook },
    { name: 'Turnos', path: '/turnos', icon: CalendarClock },
    { name: 'Locaciones', path: '/locaciones', icon: House },
    { name: 'Configuraciones', path: '/configuraciones', icon: Settings },
    { name: 'Usuarios', path: '/usuarios', icon: Users }
  ]
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.isOpen : ''}`}>
      <div className={styles.menuNavegacion}>
        <span>MENÚ DE NAVEGACIÓN</span>
      </div>
      <ListGroup variant="flush" className="mt-3">
        {links.map(({ name, path, icon: Icon }) => (
          <ListGroup.Item key={path}>
            <Link to={path} className={`${styles.link} text-black`}>
              <Icon size={18} className="me-2" />
              {name}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </aside>
  );
};

export default Sidebar;
