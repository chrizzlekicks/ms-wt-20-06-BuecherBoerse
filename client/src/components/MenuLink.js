import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

const MenuLink = ({ id, url, text }) => {
    const { hideLinks } = useGlobalContext();
    return (
        <>
            <li key={id} onClick={hideLinks} className='menu-link'>
                <NavLink to={url}>{text}</NavLink>
            </li>
        </>
    );
};

export default MenuLink;
