import './Galery.css';

import React, { useEffect, useState } from 'react';

import { useDeleteCarError } from '../hooks';
import {
  deleteCar,
  getAllCarImages,
  getAllCars,
} from '../service/API_car/car.service.js';
import { useAuth } from '../context/authContext';
import { postFavorite } from '../service/API_user/user.service';

export const Galery = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [carImages, setCarImages] = useState([]);
  const [marcaFilter, setMarcaFilter] = useState('');
  const [modeloFilter, setModeloFilter] = useState('');
  const [añoFilter, setAñoFilter] = useState('');
  const [kilometrosFilter, setKilometrosFilter] = useState('');
  const [precioMinFilter, setPrecioMinFilter] = useState('');
  const [precioMaxFilter, setPrecioMaxFilter] = useState('');
  const [res, setRes] = useState({});
  const [userFavorites, setUserFavorites] = useState([]);

  const handleAddToFavorites = async (carId) => {
    try {
      const response = await postFavorite(user._id, carId); // Llama a la API para agregar a favoritos
      if (response.status === 200) {
        setUserFavorites([...userFavorites, carId]); // Actualiza la lista de favoritos en el estado local
      }
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
    }
  };

  //!---------GESTION EN OBTENCION DE VEHICULOS E IMAGENES DEL MISMO--------------

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

  //!-------------------LOGICA DE FILTROS-------------------------

  const aplicarFiltros = () => {
    const autosFiltrados = cars
      .filter((car) => !marcaFilter || car.marca === marcaFilter)
      .filter((car) => !modeloFilter || car.modelo === modeloFilter)
      .filter((car) => !añoFilter || car.año === añoFilter)
      .filter((car) => !kilometrosFilter || car.kilometros <= kilometrosFilter)
      .filter((car) => !precioMinFilter || car.precio >= precioMinFilter)
      .filter((car) => !precioMaxFilter || car.precio <= precioMaxFilter);
    setCars(autosFiltrados);
  };
  const reiniciarFiltros = () => {
    setMarcaFilter('');
    setModeloFilter('');
    setAñoFilter('');
    setKilometrosFilter('');
    setPrecioMinFilter('');
    setPrecioMaxFilter('');
    fetchData();
  };
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

  //!----------------BORRADO DE VEHICULOS----------------------

  const handleDeleteCar = async (carId) => {
    try {
      setRes(await deleteCar(carId));
      fetchData();
    } catch (error) {
      console.error('Error al borrar el vehículo:', error);
    }
  };
  useEffect(() => {
    useDeleteCarError(res);
  }, [res]);

  return (
    <>
      <div className="filters">
        <select onChange={(e) => setMarcaFilter(e.target.value)}>
          <option value="">Todas las marcas</option>
          <option value="Ford">Ford</option>
          <option value="Seat">Seat</option>
          <option value="Mercedes">Mercedes</option>
          <option value="BMW">BMW</option>
          <option value="Audi">Audi</option>
          <option value="Fiat">Fiat</option>
          <option value="Opel">Opel</option>
          {/* Opciones de marcas */}
        </select>
        <input
          type="text"
          placeholder="Modelo"
          value={modeloFilter}
          onChange={(e) => setModeloFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Año"
          value={añoFilter}
          onChange={(e) => setAñoFilter(parseInt(e.target.value))}
        />
        <input
          type="number"
          placeholder="Kilómetros máximos"
          value={kilometrosFilter}
          onChange={(e) => setKilometrosFilter(parseInt(e.target.value))}
        />
        <input
          type="number"
          placeholder="Precio mínimo"
          value={precioMinFilter}
          onChange={(e) => setPrecioMinFilter(parseInt(e.target.value))}
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={precioMaxFilter}
          onChange={(e) => setPrecioMaxFilter(parseInt(e.target.value))}
        />
        <button onClick={aplicarFiltros}>Aplicar Filtros</button>
        <button onClick={reiniciarFiltros}>Reiniciar Filtros</button>
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
                <strong>Precio:</strong> {car.precio} €
              </p>
              {user?.rol === 'admin' && (
                <button
                  className="btn-deleteCar"
                  onClick={() => handleDeleteCar(car._id)}
                >
                  Borrar vehículo
                </button>
              )}
              {!userFavorites.includes(car._id) && (
                <button
                  className="btn-addToFavorites"
                  onClick={() => handleAddToFavorites(car._id)}
                >
                  Agregar a Favoritos
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
