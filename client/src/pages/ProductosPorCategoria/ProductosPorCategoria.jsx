// ProductosPorCategoria.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../ProductosPorCategoria/ProductosPorCategoria.css'


const ProductosPorCategoria = () => {
    const { categoria } = useParams(); // Obtiene la categoría de la URL
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products?categoria=${categoria}`); // Cambia la URL si es necesario
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setError('No se pudieron cargar los productos. Intenta de nuevo más tarde.');
            }
        };

        fetchProductos();
    }, [categoria]);

    return (
        <div className="productos-por-categoria">
            <h2>Productos en la categoría: {categoria}</h2>
            {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error si hay */}

            <div className="galeria">
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <div key={producto._id} className="producto-card">
                            <img src={`http://localhost:5000/uploads/${producto.imagen}`} alt={producto.nombre} />
                            <h3>{producto.nombre}</h3>
                            <p>Precio: ${producto.precio}</p>
                            <p>{producto.descripcion}</p>
                            <p>Categoría: {producto.categoria}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles en esta categoría.</p>
                )}
            </div>
        </div>
    );
};

export default ProductosPorCategoria;