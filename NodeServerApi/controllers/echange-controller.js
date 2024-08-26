const { Echange, EchangeDetail, Utilisateur, Poste, Objet, Postedetails, HistoriqueProprietaire } = require('../models');

exports.createEchange = async (req, res) => {
    const { post_id, responder_id, description, details } = req.body;

    try {
        const responder = await Utilisateur.findByPk(responder_id);
        const post = await Poste.findByPk(post_id, {
            include: [{ model: Postedetails}]
        });

        if (!post || !responder) {
            return res.status(400).json({ message: 'Post or Responder not found' });
        }

        const proposer_id = post.user_id;

        const newEchange = await Echange.create({
            post_id,
            proposer_id,
            responder_id,
            description,
            status: 'pending'
        });

        // Ajouter chaque objet proposé pour l'échange
        for (const detail of details) {
            await EchangeDetail.create({ echange_id: newEchange.id, objet_id: detail.objet_id });
        }

        res.status(201).json({ message: 'Echange created successfully', echange: newEchange });
    } catch (error) {
        console.error('Error creating echange:', error);
        res.status(500).json({ message: 'Error creating echange', error: error.message });
    }
};

exports.getEchanges = async (req, res) => {
    try {
        const echanges = await Echange.findAll({
            include: [
                { model: Utilisateur, as: 'Proposer', attributes: ['username', 'email'] },
                { model: Utilisateur, as: 'Responder', attributes: ['username', 'email'] },
                { model: Poste, attributes: ['titre'] },
                {
                    model: EchangeDetail,
                    include: [{ model: Objet, attributes: ['name', 'description'] }]
                }
            ]
        });
        res.json(echanges);
    } catch (error) {
        console.error('Error fetching echanges:', error);
        res.status(500).json({ message: 'Error fetching echanges', error });
    }
};

exports.getEchangeById = async (req, res) => {
    const { id } = req.params;

    try {
        const echange = await Echange.findByPk(id, {
            include: [
                { model: Utilisateur, as: 'Proposer', attributes: ['username', 'email'] },
                { model: Utilisateur, as: 'Responder', attributes: ['username', 'email'] },
                { model: Poste, attributes: ['titre'] },
                {
                    model: EchangeDetail,
                    include: [{ model: Objet, attributes: ['name', 'description'] }]
                }
            ]
        });

        if (!echange) {
            return res.status(404).json({ message: 'Echange not found' });
        }

        res.json(echange);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching echange', error });
    }
};

exports.updateEchange = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const echange = await Echange.findByPk(id, {
            include: [{ model: EchangeDetail }]
        });

        if (!echange) {
            return res.status(404).json({ message: 'Echange not found' });
        }

        echange.status = status;
        await echange.save();

        if (status === 'validé') {
            // Changer le propriétaire des objets dans les détails de l'échange
            for (const detail of echange.EchangeDetails) {
                const objet = await Objet.findByPk(detail.objet_id);
                const ancien_proprietaire_id = objet.user_id;
                objet.user_id = echange.proposer_id;
                await objet.save();

                // Enregistrer l'historique du changement de propriétaire
                await HistoriqueProprietaire.create({
                    objet_id: objet.item_id,
                    ancien_proprietaire_id,
                    nouveau_proprietaire_id: echange.proposer_id
                });
            }

            // Changer le propriétaire des objets du post
            const postDetails = await Postedetails.findAll({ where: { post_id: echange.post_id } });
            for (const postDetail of postDetails) {
                const objet = await Objet.findByPk(postDetail.item_id);
                const ancien_proprietaire_id = objet.user_id;
                objet.user_id = echange.responder_id;
                await objet.save();

                // Enregistrer l'historique du changement de propriétaire
                await HistoriqueProprietaire.create({
                    objet_id: objet.item_id,
                    ancien_proprietaire_id,
                    nouveau_proprietaire_id: echange.responder_id
                });
            }
        }

        res.json({ message: 'Echange updated successfully', echange });
    } catch (error) {
        res.status(500).json({ message: 'Error updating echange', error });
    }
};


exports.deleteEchange = async (req, res) => {
    const { id } = req.params;

    try {
        const echange = await Echange.findByPk(id);
        if (!echange) {
            return res.status(404).json({ message: 'Echange not found' });
        }

        await EchangeDetail.destroy({ where: { echange_id: id } });
        await echange.destroy();

        res.json({ message: 'Echange deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting echange', error });
    }
};

exports.getEchangesByPoste = async (req, res) => {
    const { post_id } = req.params;

    try {
        const echanges = await Echange.findAll({
            where: { post_id },
            include: [
                { model: Utilisateur, as: 'Proposer', attributes: ['username', 'email'] },
                { model: Utilisateur, as: 'Responder', attributes: ['username', 'email'] },
                { model: Poste, attributes: ['titre'] },
                {
                    model: EchangeDetail,
                    include: [{ model: Objet, attributes: ['name', 'description'] }]
                }
            ]
        });

        if (echanges.length === 0) {
            return res.status(404).json({ message: 'No exchanges found for this post' });
        }

        res.json(echanges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exchanges for post', error });
    }
};
