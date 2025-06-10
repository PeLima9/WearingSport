import React, { useState, useEffect } from 'react';
import './AgregarProducto.css';

const AgregarProducto = () => {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    description: '',
    image: null,
    categories: '',
    brandId: '',
    stock: '',
  });

  const [marcas, setMarcas] = useState([]); // ✅ marcas desde la API
  const [categorias, setCategorias] = useState([]); // ✅ categorías desde la API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Cargar marcas y categorías desde el backend
  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/Brands');
        const data = await res.json();
        setMarcas(data);
      } catch (err) {
        console.error('Error al obtener marcas:', err);
      }
    };

    const fetchCategorias = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/Categories');
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        console.error('Error al obtener categorías:', err);
      }
    };

    fetchMarcas();
    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.productName ||
      !formData.price || formData.price <= 0 ||
      !formData.categories ||
      !formData.brandId ||
      !formData.image ||
      !formData.stock
    ) {
      setError('Todos los campos son obligatorios y el precio debe ser mayor a 0.');
      return;
    }

    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:4000/api/Products', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Producto agregado exitosamente');
        setFormData({
          productName: '',
          price: '',
          description: '',
          image: null,
          categories: '',
          brandId: '',
          stock: '',
        });
        // Limpiar el input de archivo
        document.querySelector('input[type="file"]').value = '';
      } else {
        const result = await response.json();
        setError(result.message || 'Hubo un error al agregar el producto');
      }
    } catch (error) {
      console.error('Error al agregar producto:', error);
      setError('Hubo un error al agregar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agregar-producto-container">
      <h2>Agregar Nuevo Producto</h2>
      <form className="form-agregar-producto" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}

        <label>
          Nombre del producto:
          <input
            type="text"
            name="productName"
            placeholder="Ej. Nike Air Max"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Precio:
          <input
            type="number"
            name="price"
            placeholder="Ej. 99.99"
            value={formData.price}
            onChange={handleChange}
            required
            min="0.01"
          />
        </label>

        <label>
          Descripción:
          <textarea
            name="description"
            placeholder="Descripción del producto"
            value={formData.description}
            onChange={handleChange}
            maxLength="500"
          />
        </label>

        <label>
          Imagen:
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            required
          />
        </label>

        <label>
          Marca:
          <select
            name="brandId"
            value={formData.brandId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una marca</option>
            {marcas.map((marca) => (
              <option key={marca._id} value={marca._id}>
                {marca.brandName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Categoría:
          <select
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria._id} value={categoria._id}>
                {categoria.categoryName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Stock disponible:
          <input
            type="number"
            name="stock"
            placeholder="Ej. 10"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
          />
        </label>

        {formData.image && (
          <div>
            <h4>Imagen seleccionada:</h4>
            <img src={URL.createObjectURL(formData.image)} alt="Previsualización" width="100" />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Agregando...' : 'Agregar Producto'}
        </button>
      </form>
    </div>
  );
};

export default AgregarProducto;