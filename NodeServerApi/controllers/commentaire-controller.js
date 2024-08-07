const Commentaire = require('../models/commentaire');
const db = require('../models');
const Utilisateur = db.Utilisateur;
const Poste = db.Poste;

exports.createCommentaire = async (req, res) => {
    const { description, auteur_id, poste_id } = req.body;

    try {
        // Vérifier si l'utilisateur et le poste existent
        const user = await Utilisateur.findByPk(auteur_id);
        const poste = await Poste.findByPk(poste_id);

        if (!user || !poste) {
            return res.status(400).json({ message: 'User or post not found' });
        }

        // Créer le commentaire
        const newCommentaire = new Commentaire({ description, auteur_id, poste_id });
        await newCommentaire.save();

        res.status(201).json({ message: 'Comment created successfully', commentaire: newCommentaire });
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error });
    }
};

exports.getCommentairesByPostId = async (req, res) => {
    const { poste_id } = req.params;

    try {
        const commentaires = await Commentaire.find({ poste_id });

        const commentairesAvecUtilisateur = await Promise.all(commentaires.map(async (commentaire) => {
            const utilisateur = await Utilisateur.findOne({ where: { user_id: commentaire.auteur_id } });
            return {
                ...commentaire._doc,
                utilisateur: {
                    username: utilisateur.username,
                    email: utilisateur.email
                }
            };
        }));

        res.status(200).json(commentairesAvecUtilisateur);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

exports.updateCommentaire = async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const commentaire = await Commentaire.findById(id);
        if (!commentaire) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        commentaire.description = description;
        await commentaire.save();

        res.json({ message: 'Comment updated successfully', commentaire });
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error });
    }
};

exports.deleteCommentaire = async (req, res) => {
    const { id } = req.params;

    try {
        const commentaire = await Commentaire.findById(id);
        if (!commentaire) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        await commentaire.remove();

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};
