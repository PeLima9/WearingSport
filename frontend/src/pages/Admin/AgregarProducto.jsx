import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMarcas } from "../../hooks/useMarcas";
import { useCategorias } from "../../hooks/useCategorias";
import FormularioAgregarProducto from "../../components/Admin/FormularioAgregarProducto";
import "./AgregarProducto.css";

const AgregarProducto = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const marcas = useMarcas();
  const categorias = useCategorias();

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    description: "",
    image: null,
    categories: "",
    brandId: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.productName ||
      !formData.price ||
      formData.price <= 0 ||
      !formData.categories ||
      !formData.brandId ||
      !formData.image ||
      !formData.stock
    ) {
      setError("Todos los campos son obligatorios y el precio debe ser mayor a 0.");
      return;
    }

    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:4000/api/Products", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Producto agregado exitosamente");
        setFormData({
          productName: "",
          price: "",
          description: "",
          image: null,
          categories: "",
          brandId: "",
          stock: "",
        });
        fileInputRef.current.value = "";
      } else {
        const result = await response.json();
        setError(result.message || "Hubo un error al agregar el producto");
      }
    } catch (error) {
      console.error("Error al agregar producto:", error);
      setError("Hubo un error al agregar el producto");
    } finally {
      setLoading(false);
    }
  };

  const handleVerProductos = () => {
    navigate("/admin/productos");
  };

  return (
    <FormularioAgregarProducto
      formData={formData}
      marcas={marcas}
      categorias={categorias}
      error={error}
      loading={loading}
      fileInputRef={fileInputRef}
      handleChange={handleChange}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      handleVerProductos={handleVerProductos}
    />
  );
};

export default AgregarProducto;
