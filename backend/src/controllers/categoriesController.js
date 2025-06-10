const categoriesController = {};
import categoriesModel from "../models/Categories.js";

//Select / Get
categoriesController.getCategories = async (req, res) => {
    try {
        const categories = await categoriesModel.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};

//Insert / Post
categoriesController.insertCategory = async (req, res) => {
    try {
        const { categoryName, description } = req.body;
        
        // Validación básica
        if (!categoryName || !description) {
            return res.status(400).json({ message: "Category name and description are required" });
        }
        
        const newCategory = new categoriesModel({ categoryName, description });
        await newCategory.save();
        res.json({ message: "Category Added", category: newCategory });
    } catch (error) {
        res.status(500).json({ message: "Error adding category", error: error.message });
    }
};

//Delete
categoriesController.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await categoriesModel.findByIdAndDelete(req.params.id);
        
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        
        res.json({ message: "Category Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error: error.message });
    }
};

//Update / Put
categoriesController.updateCategory = async (req, res) => {
    try {
        const { categoryName, description } = req.body;
        
        // Validación básica
        if (!categoryName || !description) {
            return res.status(400).json({ message: "Category name and description are required" });
        }
        
        const updatedCategory = await categoriesModel.findByIdAndUpdate(
            req.params.id, 
            { categoryName, description }, 
            { new: true }
        );
        
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        
        res.json({ message: "Category Updated", category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error: error.message });
    }
};

//Export
export default categoriesController;