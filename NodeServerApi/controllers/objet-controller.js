const Image = require('../models/image');
const db = require('../models');
const { Op } = require('sequelize'); // Importer Op de Sequelize
const Objet = db.Objet;
const Utilisateur = db.Utilisateur;
const Categorie = db.Categorie;

exports.createObjet = async (req, res) => {
    const { user_id, categorie_id, name, description, images } = req.body;

    try {
        // Vérifier si l'utilisateur et la catégorie existent
        const user = await Utilisateur.findByPk(user_id);
        const categorie = await Categorie.findByPk(categorie_id);

        if (!user || !categorie) {
            return res.status(400).json({ message: 'User or category not found' });
        }

        // Créer l'objet
        const newObjet = await Objet.create({ user_id, categorie_id, name, description });

        // Ajouter les images à MongoDB
        for (const img of images) {
            const newImage = new Image({ item_id: newObjet.item_id, img });
            await newImage.save();
        }

        res.status(201).json({ message: 'Object created successfully', objet: newObjet });
    } catch (error) {
        res.status(500).json({ message: 'Error creating object', error });
    }
};

exports.getObjets = async (req, res) => {
    const { page = 1, limit = 10, nomUtilisateur, categorie, nomObjet, description } = req.query;

    const filters = {};

    if (nomUtilisateur) {
        filters['$Utilisateur.username$'] = { [Op.iLike]: `%${nomUtilisateur}%` };
    }
    if (categorie) {
        filters.categorie_id = categorie;
    }
    if (nomObjet) {
        filters.name = { [Op.iLike]: `%${nomObjet}%` };
    }
    if (description) {
        filters.description = { [Op.iLike]: `%${description}%` };
    }

    try {
        const objets = await Objet.findAndCountAll({
            where: filters,
            include: [
                {
                    model: Utilisateur,
                    attributes: ['username'],
                    as: 'Utilisateur'
                },
                {
                    model: Categorie,
                    attributes: ['nom'],
                    as: 'Categorie'
                }
            ],
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit)
        });

        const totalPages = Math.ceil(objets.count / limit);
        const hasNext = parseInt(page) < totalPages;
        const hasPrev = parseInt(page) > 1;

        res.json({
            total: objets.count,
            page: parseInt(page),
            totalPages,
            hasNext,
            hasPrev,
            data: objets.rows
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching objects', error });
    }
};


exports.getObjetById = async (req, res) => {
    const { id } = req.params;

    try {
        const objet = await Objet.findByPk(id, {
            include: [
                {
                    model: Utilisateur,
                    attributes: ['username'],
                    as: 'Utilisateur'
                },
                {
                    model: Categorie,
                    attributes: ['categorie_id', 'nom'],
                    as: 'Categorie'
                }
            ]
        });
        
        if (!objet) {
            return res.status(404).json({ message: 'Object not found' });
        }

        const images = await Image.find({ item_id: id });
        res.json({ objet, images });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching object', error });
    }
};

exports.updateObjet = async (req, res) => {
    const { id } = req.params;
    const { name, description, images } = req.body;

    try {
        const objet = await Objet.findByPk(id);
        if (!objet) {
            return res.status(404).json({ message: 'Object not found' });
        }

        objet.name = name;
        objet.description = description;
        await objet.save();

        // Mettre à jour les images dans MongoDB
        await Image.deleteMany({ item_id: id });
        for (const img of images) {
            const newImage = new Image({ item_id: id, img });
            await newImage.save();
        }

        res.json({ message: 'Object updated successfully', objet });
    } catch (error) {
        res.status(500).json({ message: 'Error updating object', error });
    }
};

exports.deleteObjet = async (req, res) => {
    const { id } = req.params;

    try {
        const objet = await Objet.findByPk(id);
        if (!objet) {
            return res.status(404).json({ message: 'Object not found' });
        }

        await objet.destroy();
        await Image.deleteMany({ item_id: id });

        res.json({ message: 'Object deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting object', error });
    }
};
