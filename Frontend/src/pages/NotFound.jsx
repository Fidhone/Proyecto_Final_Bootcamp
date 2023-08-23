import './NotFound.css';

import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="container-found">
      <div className="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div className="content">
        <h1 className="main-heading">Esta página no existe.</h1>
        <p>...Quizás la página que estás buscando no se encuentra o nunca existió.</p>
        <Link to="/dashboard">
          <button className="btn-found">
            Volver al inicio <i className="far fa-hand-point-right"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};
