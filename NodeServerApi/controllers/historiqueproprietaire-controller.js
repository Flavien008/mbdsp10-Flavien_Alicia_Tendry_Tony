const { HistoriqueProprietaire, Utilisateur, Objet } = require('../models');

exports.getHistoriqueByObjet = async (req, res) => {
    const { objet_id } = req.params;

    try {
        const historique = await HistoriqueProprietaire.findAll({
            where: { objet_id },
            include: [
                { model: Utilisateur, as: 'AncienProprietaire', attributes: ['username', 'email'] },
                { model: Utilisateur, as: 'NouveauProprietaire', attributes: ['username', 'email'] },
                { model: Objet, attributes: ['name', 'description'] }
            ],
            order: [['date_changement', 'DESC']]
        });

        if (!historique.length) {
            return res.status(404).json({ message: 'No history found for this object' });
        }

        res.json(historique);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history', error });
    }
};
