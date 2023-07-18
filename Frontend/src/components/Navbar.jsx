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
              <li>
                <a href="/register">Sign Up</a>
              </li>
              <li>
                <a href="/login">Sign In</a>
              </li>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
              {user ? (
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              ) : null}
            </ul>
          </nav>
        </header>
      </div>
    </>
  );
};
