import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento (donde se guardarán los archivos temporalmente)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Guardar los archivos en el directorio "uploads" en el servidor
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Asegurarse de que el nombre del archivo sea único
    cb(null, Date.now() + path.extname(file.originalname)); // Añadimos timestamp al nombre del archivo
  }
});

// Filtrar solo los archivos de imagen (puedes agregar más extensiones si es necesario)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Tipos de imagen permitidos
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // Aceptar el archivo
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed!'), false);  // Rechazar el archivo
  }
};

// Limitar el tamaño de los archivos (en este caso, 5 MB)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limitar a 5MB
});

export default upload;  // Exportar para usarlo en las rutas
