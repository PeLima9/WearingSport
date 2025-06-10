import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    // Puedes agregar más campos según tus necesidades
    // Por ejemplo: icon, color, isActive, etc.
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

export default mongoose.model("Categories", categoriesSchema);