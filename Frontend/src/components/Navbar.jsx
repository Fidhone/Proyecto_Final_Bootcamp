import './Navbar.css';

import { useAuth } from '../context/authContext';

export const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <>
      <div className="menu-btn">
        <i className="fa fa-bars fa-2x"> </i>
      </div>
      <div className="wrapper">
        <header>
          <nav className="main-nav">
            <img
              src="https://nav.files.bbci.co.uk/orbit/aca157ce812540152d62d3742f6c491c/img/blq-orbit-blocks_white.svg"
              alt=""
            />
            <ul className="main-menu">
              {!user ? (
                <li>
                  <a href="/register">Registrate</a>
                </li>
              ) : null}
              {!user ? (
                <li>
                  <a href="/login">Inicio de sesion</a>
                </li>
              ) : null}
              {user ? (
                <li>
                  <a href="/dashboard">Inicio</a>
                </li>
              ) : null}
              {user ? (
                <li>
                  <a href="/profile">Perfil</a>
                </li>
              ) : null}
              {user ? (
                <li>
                  <a href="/" onClick={logout}>
                    Cerrar sesion
                  </a>
                </li>
              ) : null}
            </ul>
          </nav>
        </header>
      </div>
    </>
  );
};
