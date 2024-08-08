const Categorie = require('../models/categorie');
const { Op } = require('sequelize');
// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const { nom } = req.query;
        let categories;

        if (nom) {
            categories = await Categorie.findAll({
                where: {
                    nom: {
                        [Op.iLike]: `%${nom}%`
                    }
                }
            });
        } else {
            categories = await Categorie.findAll();
        }

        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};


// Create a new category
exports.createCategorie = async (req, res) => {
    const { nom } = req.body;
    try {
        const newCategorie = await Categorie.create({ nom });
        res.status(201).json({ message: 'Category created successfully', category: newCategorie });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};

// Update a category
exports.updateCategorie = async (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;
    try {
        const categorie = await Categorie.findByPk(id);
        if (categorie) {
            categorie.nom = nom;
            await categorie.save();
            res.json({ message: 'Category updated successfully', category: categorie });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
};

// Delete a category
exports.deleteCategorie = async (req, res) => {
    const { id } = req.params;
    try {
        const categorie = await Categorie.findByPk(id);
        if (categorie) {
            await categorie.destroy();
            res.json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};
