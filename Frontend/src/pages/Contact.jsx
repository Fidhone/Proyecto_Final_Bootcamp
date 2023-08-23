import './Contact.css';

import React from 'react';
export const Contact = () => {
  return (
    <div className="form-main">
      <div className="main-wrapper">
        <h2 className="form-head">Contacta con nosotros</h2>
        <form className="form-wrapper">
          <div className="form-card">
            <input
              className="form-input"
              type="text"
              name="full_name"
              required="required"
            />
            <label className="form-label" htmlFor="full_name">
              Nombre completo
            </label>
          </div>
          <div className="form-card">
            <input className="form-input" type="email" name="email" required="required" />
            <label className="form-label" htmlFor="email">
              Email
            </label>
          </div>
          <div className="form-card">
            <input
              className="form-input"
              type="number"
              name="phone_number"
              required="required"
            />
            <label className="form-label" htmlFor="phone_number">
              Numero de telefono
            </label>
          </div>

          <div className="form-card">
            <textarea
              className="form-textarea"
              maxLength="420"
              rows="3"
              name="phone_number"
              required="required"
            ></textarea>
            <label className="form-textarea-label" htmlFor="Comment">
              Comentanos brevemente sobre que vehiculo necesita informacion
            </label>
          </div>
          <div className="btn-wrap">
            <button> Enviar </button>
          </div>
        </form>
      </div>
    </div>
  );
};
