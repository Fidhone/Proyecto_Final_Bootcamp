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
          <a href="#" className="link-1">
            Inicio
          </a>

          <a href="#">Blog</a>

          <a href="#">Galeria</a>

          <a href="#">Faq</a>

          <a href="#">Contacto</a>
        </p>

        <p className="footer-company-name">Coches FTM © 2023</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>C/Falsa 123</span> 28850 Crater nebula, Marte.
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
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fa fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};
