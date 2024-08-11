const { Utilisateur, Poste, Comment, Echange, Categorie, Objet } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

exports.getUserStatistics = async (req, res) => {
  try {
    const totalUsers = await Utilisateur.count();

    const { year, month } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const activeUsers = await Utilisateur.count({
      where: {
        [Op.or]: [
          { '$Posts.created_at$': { [Op.between]: [startDate, endDate] } },
          { '$Comments.created_at$': { [Op.between]: [startDate, endDate] } },
          { '$Echanges.created_at$': { [Op.between]: [startDate, endDate] } }
        ]
      },
      include: [
        { model: Poste, attributes: [] },
        { model: Comment, attributes: [] },
        { model: Echange, where: { status: 'validé' }, attributes: [] }
      ],
      distinct: true,
      col: 'user_id'
    });

    const newUsers = await Utilisateur.count({
      where: {
        created_at: {
          [Op.between]: [startDate, endDate]
        }
      }
    });

    res.status(200).json({ totalUsers, activeUsers, newUsers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user statistics', error });
  }
};

exports.getExchangeStatistics = async (req, res) => {
  try {
    const { year } = req.query;

    const exchangesData = await Echange.findAll({
      attributes: [
        [sequelize.fn('date_trunc', 'month', sequelize.col('created_at')), 'month'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN status = 'validé' THEN 1 END")), 'accepted']
      ],
      where: {
        created_at: {
          [Op.between]: [new Date(year, 0, 1), new Date(year, 11, 31)]
        }
      },
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