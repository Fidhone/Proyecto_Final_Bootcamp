import './Navbar.css';

import Logout from './Logout';

export const Navbar = ({ user }) => {
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
              {/* <li>
                <a href="#">Xbox</a>
              </li>
              <li>
                <a href="#">Deals</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li> */}
              <button>{<Logout user={user} />}</button>
            </ul>
          </nav>
        </header>
      </div>
    </>
  );
};
