import { Link } from 'react-router-dom';
import { FaBook, FaBookOpen } from 'react-icons/fa';
import logo from '../static/kodebi_normal.svg';
import MenuLink from './MenuLink';
import { links } from '../utils/linksDB';
import UserBar from './UserBar';
import { useNavbarContext } from '../context/NavbarContext';
import { useGlobalContext } from '../context/GlobalContext';

const Navbar = () => {
    const { navbar, toggleNavbar, hideSubmenu } = useNavbarContext();
    const { showLinks, hideLinks } = useGlobalContext();

    return (
        <>
            <nav
                className={
                    navbar ? 'nav-center sticky-nav animate-nav' : 'nav-center'
                }
                onClick={hideSubmenu}
            >
                <header className='nav-content'>
                    <div className='nav-header basic-flex'>
                        <Link to='/' className='basic-flex' onClick={hideLinks}>
                            <img src={logo} alt='logo' width='80' height='80' />
                        </Link>
                        <button className='nav-toggle' onClick={toggleNavbar}>
                            {showLinks ? <FaBookOpen /> : <FaBook />}
                        </button>
                    </div>
                    <div
                        className={
                            showLinks ? 'nav-menu show-menu' : 'nav-menu'
                        }
                    >
                        <ul className='links-container basic-flex'>
                            {links.map((link) => {
                                return <MenuLink key={link.id} {...link} />;
                            })}
                        </ul>
                        <UserBar />
                    </div>
                </header>
            </nav>
        </>
    );
};

export default Navbar;
