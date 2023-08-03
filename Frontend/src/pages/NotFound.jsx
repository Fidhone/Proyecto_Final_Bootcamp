import React from 'react';
import './NotFound.css';
export const NotFound = () => {
  return (
    <div className="container-found">
      <div className="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div className="content">
        <h1 className="main-heading">Esta pagina no existe.</h1>
        <p>...Quizás la página que estás buscando no se encuentra o nunca existió.</p>
        <a href="https://www.google.co.in/" target="blank">
          <button className="btn-found">
            Volver al inicio <i className="far fa-hand-point-right"></i>
          </button>
        </a>
      </div>
    </div>
  );
};
