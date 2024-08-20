const { Utilisateur, Poste, Comment, Echange, Categorie, Objet } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');
const commentaire = require('../models/commentaire');

exports.getUserStatistics = async (req, res) => {
  try {
    const totalUsers = await Utilisateur.count();

    const { date1, date2 } = req.query;

    // Vérification des valeurs de date1 et date2
    if (!date1 && !date2) {
      return res.status(400).json({ message: 'At least one of date1 or date2 is required' });
    }

    const startDate = date1 ? new Date(date1) : null;
    const endDate = date2 ? new Date(date2) : null;

    // Vérification de la validité des dates
    if ((date1 && isNaN(startDate)) || (date2 && isNaN(endDate))) {
      return res.status(400).json({ message: 'Invalid date1 or date2 provided' });
    }

    // Construction de la condition de date pour le filtre
    const dateCondition = {};
    if (startDate) {
      dateCondition[Op.gte] = startDate;
    }
    if (endDate) {
      dateCondition[Op.lte] = endDate;
    }

    // Requête pour les utilisateurs actifs
    const activeUsers = await Utilisateur.count({
      where: {
        [Op.or]: [
          { '$Postes.created_at$': dateCondition },  // Condition pour les utilisateurs avec un Poste
          { '$Echanges.created_at$': dateCondition } // Condition pour les utilisateurs avec un Echange
        ]
      },
      include: [
        {
          model: Poste,
          attributes: [], // Ne récupérer aucun attribut de Poste, juste pour la jointure
          required: false // Utiliser left join pour Poste
        },
        {
          model: Echange,
          attributes: [], // Ne récupérer aucun attribut de Echange, juste pour la jointure
          required: false // Utiliser left join pour Echange
        }
      ],
      distinct: true,
      col: 'user_id', // Utiliser l'identifiant de l'utilisateur pour le comptage distinct
      logging: console.log
    });
    

    // Requête pour les nouveaux utilisateurs
    const newUsers = await Utilisateur.count({
      where: {
        created_at: dateCondition
      }
    });

    res.status(200).json({ totalUsers, activeUsers, newUsers });
  } catch (error) {
    console.error('Error fetching user statistics:', error.message);
    console.error('Stack trace:', error.stack);

    res.status(500).json({ 
      message: 'Error fetching user statistics', 
      error: {
        message: error.message,
        stack: error.stack
      }
    });
  }
};


exports.getExchangeStatistics = async (req, res) => {
  try {
    const { date1, date2 } = req.query;

    // Construire les conditions de filtre
    const whereCondition = {};

    if (date1) {
      const startDate = new Date(date1);
      if (isNaN(startDate)) {
        return res.status(400).json({ message: 'Invalid date1 provided' });
      }
      whereCondition.created_at = { [Op.gte]: startDate }; // Filtrer à partir de date1
    }

    if (date2) {
      const endDate = new Date(date2);
      if (isNaN(endDate)) {
        return res.status(400).json({ message: 'Invalid date2 provided' });
      }
      whereCondition.created_at = whereCondition.created_at || {};
      whereCondition.created_at[Op.lte] = endDate; // Filtrer jusqu'à date2
    }

    if (!date1 && !date2) {
      return res.status(400).json({ message: 'At least one of date1 or date2 is required' });
    }

    const exchangesData = await Echange.findAll({
      attributes: [
        [sequelize.fn('date_trunc', 'month', sequelize.col('created_at')), 'month'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN status = 'validé' THEN 1 END")), 'accepted']
      ],
      where: whereCondition,
      group: ['month'],
      order: [[sequelize.fn('date_trunc', 'month', sequelize.col('created_at')), 'ASC']]
    });

    res.status(200).json(exchangesData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exchange statistics', error });
  }
};



exports.getCategoryDistribution = async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      attributes: [
        'nom', // Assurez-vous que le nom de la colonne est correct
        [sequelize.fn('COUNT', sequelize.col('Objets.item_id')), 'count']
      ],
      include: [{
        model: Objet,
        as: 'Objets',
        attributes: []
      }],
      group: ['Categorie.categorie_id']
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching category distribution:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching category distribution', error });
  }
};