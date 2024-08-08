const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/utilisateur');
const { Op } = require('sequelize');

exports.getUsersByRole = async (req, res) => {
    const {  nom, role_id, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    try {
        const whereConditions = {
            role_id: role_id || 1, 
            [Op.or]: []
        };

        if (nom) {
            whereConditions[Op.or].push({ email: { [Op.iLike]: `%${nom}%` } });
        }
        if (nom) {
            whereConditions[Op.or].push({ username: { [Op.iLike]: `%${nom}%` } });
        }

        if (whereConditions[Op.or].length === 0) {
            delete whereConditions[Op.or];
        }

        const { count, rows } = await Utilisateur.findAndCountAll({
            where: whereConditions,
            offset,
            limit: parseInt(limit)
        });

        res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            users: rows
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};


exports.signup = async (req, res) => {
    const { username, email, dateNaissance, role_id, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Utilisateur.create({ username, email, dateNaissance, role_id, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Utilisateur.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Verifiez vos information.' });
        }

        const token = jwt.sign({ userId: user.user_id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '1h' });

        res.status(200).json({
            user: {
                id: user.user_id,
                name: user.username
            },
            message: 'Login successful',
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, dateNaissance} = req.body;

    try {
        const user = await Utilisateur.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }


        await user.update({
            username,
            email,
            dateNaissance
        });

        res.status(200).json({ message: 'Utilisateur mis à jour avec succès.', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Fonction pour supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Utilisateur.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        await user.destroy();

        res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
