const Poste = require('../models/poste');
const Postedetails = require('../models/postedetails');
const Utilisateur = require('../models/utilisateur');
const Objet = require('../models/objet');

exports.createPoste = async (req, res) => {
    const { user_id, titre, longitude, latitude, description, status, items } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await Utilisateur.findByPk(user_id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Créer le poste
        const newPoste = await Poste.create({ user_id, titre, longitude, latitude, description, status });

        // Ajouter les détails du poste
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
    try {
        const postes = await Poste.findAll();
        res.json(postes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

exports.getPosteById = async (req, res) => {
    const { id } = req.params;

    try {
        const poste = await Poste.findByPk(id, {
            include: {
                model: Postedetails,
                include: {
                    model: Objet
                }
            }
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

        // Mettre à jour les détails du poste
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
        await Postedetails.destroy({ where: { post_id: id } });
        await poste.destroy();

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
};
