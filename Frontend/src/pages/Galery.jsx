import React, { useState, useEffect } from 'react';
import './Galery.css';
import { getAllCars, getAllCarImages } from '../service/API_car/car.service.js';

export const Galery = () => {
  const [cars, setCars] = useState([]);
  const [carImages, setCarImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCars();
        if (response.status === 200) {
          setCars(response.data);
        } else {
          console.error('Error al obtener la lista de coches');
        }
      } catch (error) {
        console.error('Error al obtener la lista de coches:', error);
      }
    };

    fetchData();

    const fetchCarImages = async () => {
      try {
        const images = await getAllCarImages();
        setCarImages(images);
      } catch (error) {
        console.error('Error al obtener las imágenes de coches:', error);
      }
    };

    fetchCarImages();
  }, []);

  return (
    <>
      <div className="header">
        <h1>Galeria</h1>
      </div>
      <div className="car-container">
        {cars.map((car, index) => (
          <div key={car._id} className="car-item">
            <img
              className="image"
              src={carImages[index]}
              alt={`${car.marca} ${car.modelo}`}
            />
            <div className="car-details">
              <p>
                <strong>Marca:</strong> {car.marca}
              </p>
              <p>
                <strong>Modelo:</strong> {car.modelo}
              </p>
              <p>
                <strong>Color:</strong> {car.color}
              </p>
              <p>
                <strong>Año:</strong> {car.año}
              </p>
              <p>
                <strong>Kilómetros:</strong> {car.kilometros}
              </p>
              <p>
                <strong>Precio:</strong> {car.precio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
