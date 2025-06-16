import { useAuth } from "../context/AuthContext"; // usa el correcto
import { useEffect, useState } from "react";
import "./Perfil.css";

function Perfil() {
  const { logout } = useAuth();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [userData, setUserData] = useState(null);

  // Obtener datos del perfil al cargar el componente
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/login/profile", {
          credentials: "include", // ✅ importante para enviar cookie
        });

        const data = await response.json();

        if (data.success) {
          setUserData(data.user);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error al obtener perfil:", error);
        setUserData(null);
      }
    };

    fetchProfile();
  }, []);

  if (!userData) return <p className="perfil-container">Cargando perfil...</p>;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Vista previa
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="perfil-container">
      <h2 className="perfil-title">Mi Perfil</h2>
      <div className="perfil-box">
        <div className="perfil-foto-container">
          {preview ? (
            <img src={preview} alt="Foto de perfil" className="perfil-foto" />
          ) : (
            <div className="foto-placeholder">Sin foto</div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input-foto"
          />
        </div>

        <p className="perfil-info"><span>Nombre:</span> {userData.name || "N/A"}</p>
        <p className="perfil-info"><span>Correo:</span> {userData.email || "N/A"}</p>

        <button onClick={handleLogout} className="btn-logout">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Perfil;
