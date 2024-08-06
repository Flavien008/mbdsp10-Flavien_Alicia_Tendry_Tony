const db = require('../models');
const Poste = db.Poste;
const Postedetails = db.Postedetails;
const Utilisateur = db.Utilisateur;
const Objet = db.Objet;
const Categorie = db.Categorie;

const { Op } = require('sequelize'); // Importer Op de Sequelize

exports.createPoste = async (req, res) => {
    const { user_id, titre, longitude, latitude, description, status, items } = req.body;

    try {
        const user = await Utilisateur.findByPk(user_id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const newPoste = await Poste.create({ user_id, titre, longitude, latitude, description, status });

        for (const item_id of items) {
            const item = await Objet.findByPk(item_id);
            if (item) {
                await Postedetails.create({ post_id: newPoste.poste_id, item_id });
            }
        }

        res.status(201).json({ message: 'Post created successfully', poste: newPoste });
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
};

exports.getPostes = async (req, res) => {
    const { dateDebut, dateFin, nomUtilisateur, texte, nomObjet, categorieObjet } = req.query;

    const filters = {};
    const includeFilters = [];

    // Ajouter des filtres pour les dates
    if (dateDebut && dateFin) {
        filters.created_at = {
            [Op.between]: [new Date(dateDebut), new Date(dateFin)]
        };
    } else if (dateDebut) {
        filters.created_at = {
            [Op.gte]: new Date(dateDebut)
        };
    } else if (dateFin) {
        filters.created_at = {
            [Op.lte]: new Date(dateFin)
        };
    }

    // Ajouter des filtres pour la description

    if (texte) {
        filters[Op.or] = [
            { titre: { [Op.iLike]: `%${texte}%` } },
            { description: { [Op.iLike]: `%${texte}%` } }
        ];
    }

    // Ajouter des filtres pour l'utilisateur
    if (nomUtilisateur) {
        includeFilters.push({
            model: Utilisateur,
            as: 'utilisateur',
            attributes: ['username', 'email'],
            where: {
                username: { [Op.iLike]: `%${nomUtilisateur}%` }
            }
        });
    } else {
        includeFilters.push({
            model: Utilisateur,
            as: 'utilisateur',
            attributes: ['username', 'email']
        });
    }

    // Ajouter des filtres pour le nom de l'objet et la catégorie
    if (nomObjet || categorieObjet) {
        includeFilters.push({
            model: Postedetails,
            as: 'details',
            include: [
                {
                    model: Objet,
                    as: 'Objet',
                    where: {
                        ...(nomObjet && { name: { [Op.iLike]: `%${nomObjet}%` } }),
                        ...(categorieObjet && { categorie_id: categorieObjet })
                    },
                    include: [
                        {
                            model: Categorie,
                            as: 'Categorie'
                        }
                    ]
                }
            ]
        });
    } else {
        includeFilters.push({
            model: Postedetails,
            as: 'details',
            include: [
                {
                    model: Objet,
                    as: 'Objet',
                    include: [
                        {
                            model: Categorie,
                            as: 'Categorie'
                        }
                    ]
                }
            ]
        });
    }

    try {
        const postes = await Poste.findAll({
            where: filters,
            include: includeFilters,
            limit: parseInt(req.query.limit) || 10,
            offset: ((parseInt(req.query.page) || 1) - 1) * (parseInt(req.query.limit) || 10)
        });

        const totalPages = Math.ceil(postes.length / (parseInt(req.query.limit) || 10));
        const hasNext = (parseInt(req.query.page) || 1) < totalPages;
        const hasPrev = (parseInt(req.query.page) || 1) > 1;

        res.json({
            total: postes.length,
            page: parseInt(req.query.page) || 1,
            totalPages,
            hasNext,
            hasPrev,
            data: postes
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

exports.getPosteById = async (req, res) => {
    const { id } = req.params;

    try {
        const poste = await Poste.findByPk(id, {
            include: [
                {
                    model: Utilisateur,
                    as: 'utilisateur',
                    attributes: ['username', 'email']
                },
                {
                    model: Postedetails,
                    as: 'details',
                    include: [
                        {
                            model: Objet,
                            as: 'Objet'
                        }
                    ]
                }
            ]
        });
        if (!poste) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(poste);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
};

exports.updatePoste = async (req, res) => {
    const { id } = req.params;
    const { titre, longitude, latitude, description, status, items } = req.body;

    try {
        const poste = await Poste.findByPk(id);
        if (!poste) {
            return res.status(404).json({ message: 'Post not found' });
        }

        poste.titre = titre;
        poste.longitude = longitude;
        poste.latitude = latitude;
        poste.description = description;
        poste.status = status;
        await poste.save();

        await Postedetails.destroy({ where: { post_id: id } });
        for (const item_id of items) {
            const item = await Objet.findByPk(item_id);
            if (item) {
                await Postedetails.create({ post_id: id, item_id });
            }
        }

        res.json({ message: 'Post updated successfully', poste });
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
    }
};

exports.deletePoste = async (req, res) => {
    const { id } = req.params;

    try {
        const poste = await Poste.findByPk(id);
        if (!poste) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await poste.destroy();
        await Postedetails.destroy({ where: { post_id: id } });

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
};
