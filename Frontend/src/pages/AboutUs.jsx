import '../pages/AboutUs.css';

import React, { useState } from 'react';

export const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const accordionItems = [
    {
      header: '¿Cómo puedo buscar un vehículo en COCHES FTM?',
      content: `Puedes ir a la sección "galería".
      Allí se encuentran todos los vehículos disponibles, puedes realizar busquedas, ordenar los vehículos,ver la información de cada vehículo, etc.`,
    },
    {
      header: '¿Cómo me pongo en contacto con la empresa?',
      content: `Puedes ponerte en contacto con la empresa por muchas vías(Teléfono,Email,Facebook,Twitter,etc).
      Solo tendrás que ir a la sección abajo del todo donde se muestra toda la información de la empresa`,
    },
    {
      header: '¿Cómo puedo realizar una compra en COCHES FTM?',
      content: `Para realizar una compra en COCHES FTM tendrás que ir al apartado "Contacto" y rellenar el formulario.
      En pocos minutos nos pondremos en contacto con usted y si procede, le daremos las indicaciones necesarias para hacer los trámites.`,
    },
    {
      header: 'He olvidado mi contraseña, ¿Cómo puedo recuperarla?',
      content: `El proceso para recuperar tu contraseña es sencillo. Sigue estos pasos:
      1. En la home accede al apartado "perfil". Aquí podrás ver los datos de tu cuenta
      2. Accede al apartado "cambiar contraseña".
      A partir de aquí, solo tendrás que seguir las instrucciones.`,
    },
    {
      header: '¿Cómo puedo darme de baja?,¿Se borrarán todos mis datos?',
      content: `Puedes darte de baja de COCHES FTM realizando lo siguiente: Accede a tu cuenta con usuario y contraseña y pulsa sobre la opcion "perfil".
      Una vez accedas pincha en "borrar usuario". Una vez realizado, se borrarán todos los datos de nuestra base de datos y no se podrán recuperar.`,
    },
  ];

  return (
    <>
      <h1 className="h1-faqs">FAQ'S</h1>
      <div className="accordion">
        {accordionItems.map((item, index) => (
          <div className="accordion-item" key={index}>
            <div
              className={`accordion-item-header ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleAccordionClick(index)}
            >
              {item.header}
            </div>
            <div
              className="accordion-item-body"
              style={{
                maxHeight: activeIndex === index ? '100%' : 0,
              }}
            >
              <div className="accordion-item-body-content">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
