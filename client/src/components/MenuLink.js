import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

const MenuLink = ({ id, url, text }) => {
  const { hideLinks } = useGlobalContext();
  return (
    <>
      <li key={id} className='links'>
        <NavLink to={url} onClick={hideLinks}>
          {text}
        </NavLink>
      </li>
    </>
  );
};

export default MenuLink;
