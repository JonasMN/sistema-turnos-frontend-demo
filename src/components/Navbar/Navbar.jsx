import { Menu, LogOut } from 'lucide-react';
import moment from "moment";
import "moment/locale/es";
import LogoJPH from '../../assets/logos/LogoJPH.svg';
import useModal from "../../hooks/useModal";
import Button from "../../components/Button/Button.jsx";
import styles from "./Navbar.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

moment.locale("es");

const Navbar = ({ toggleOpen }) => {
    const [isMenuOpen, toggleMenu] = useModal();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    return (
        <nav className={styles.navbarContainer}>
            <div className="d-flex align-items-center gap-2">
                <Menu className={styles.menuBurger} onClick={toggleOpen} />
                <Link to="/">
                    <img src={LogoJPH} alt="Logo" className={styles.logo} />
                </Link>
            </div>

            <div className={styles.logoutIcon} onClick={handleLogout}>
                <Button
                    type="submit"
                    variant="primary"
                    size="small"
                    icon={LogOut}
                >
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
