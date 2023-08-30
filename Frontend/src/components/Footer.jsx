import './Footer.css';

import React from 'react';
export const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          Coches<span>FTM</span>
        </h3>

        <p className="footer-links">
          <a className="link-1">Inicio</a>

          <a>Galeria</a>

          <a>Perfil</a>

          <a>Faq</a>

          <a>Contacto</a>
        </p>

        <p className="footer-company-name">CochesFTM Company © 2023</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>C/Los peces 123</span> 28850 Crater nebula, Marte.
          </p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>91 623 345 234</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:support@company.com">CochesFTM@company.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>Acerca de nosotros</span>
          Proyecto creado con pasion para los que buscan lo mejor en vehiculos nuevos o de
          ocasion.
        </p>

        <div className="footer-icons">
          <a>
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a>
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a>
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a>
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};
