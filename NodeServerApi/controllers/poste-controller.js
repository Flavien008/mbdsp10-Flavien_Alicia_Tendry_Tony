const db = require('../models');
const Image = require('../models/image');
const Poste = db.Poste;
const Postedetails = db.Postedetails;
const Utilisateur = db.Utilisateur;
const Objet = db.Objet;
const Categorie = db.Categorie;
const Notification = require('../models/notification');
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
    const { dateDebut, dateFin, nomUtilisateur, texte, nomObjet, categorieObjet, status, sortByDate } = req.query;

    const filters = {};
    const includeFilters = [];

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

    if (texte) {
        filters[Op.or] = [
            { titre: { [Op.iLike]: `%${texte}%` } },
            { description: { [Op.iLike]: `%${texte}%` } }
        ];
    }

    if (status && status !== undefined) {
        filters.status = status;
    }

    if (nomUtilisateur) {
        includeFilters.push({
            model: Utilisateur,
            as: 'Utilisateur',
            attributes: ['username', 'email'],
            where: {
                username: { [Op.iLike]: `%${nomUtilisateur}%` }
            }
        });
    } else {
        includeFilters.push({
            model: Utilisateur,
            as: 'Utilisateur',
            attributes: ['username', 'email']
        });
    }

    if (nomObjet || categorieObjet) {
        includeFilters.push({
            model: Postedetails,
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

    const order = [];
    if (sortByDate) {
        order.push(['created_at', sortByDate.toUpperCase()]);
    }

    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const { count, rows } = await Poste.findAndCountAll({
            where: filters,
            include: includeFilters,
            limit: limit,
            offset: (page - 1) * limit,
            order: order.length ? order : [['created_at', 'DESC']]
        });

        // Fetch images for each object within the posts
        const postesWithImages = await Promise.all(rows.map(async (post) => {
            const postDetailsWithImages = await Promise.all(post.Postedetails.map(async (detail) => {
                const images = await Image.find({ item_id: detail.Objet.item_id });
                return {
                    ...detail.toJSON(),
                    Objet: {
                        ...detail.Objet.toJSON(),
                        images
                    }
                };
            }));
            return {
                ...post.toJSON(),
                Postedetails: postDetailsWithImages
            };
        }));

        const totalPages = Math.ceil(count / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;

        res.json({
            total: count,
            page: page,
            totalPages,
            hasNext,
            hasPrev,
            data: postesWithImages
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
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
                    as: 'Utilisateur',
                    attributes: ['username', 'email']
                },
                {
                    model: Postedetails,
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
                }
            ]
        });

        if (!poste) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Fetch images for each object within the post
        const postDetailsWithImages = await Promise.all(poste.Postedetails.map(async (detail) => {
            const images = await Image.find({ item_id: detail.Objet.item_id });
            return {
                ...detail.toJSON(),
                Objet: {
                    ...detail.Objet.toJSON(),
                    images
                }
            };
        }));

        // Attach the images to the post details
        const posteWithImages = {
            ...poste.toJSON(),
            Postedetails: postDetailsWithImages
        };

        res.json(posteWithImages);
    } catch (error) {
        console.error('Error fetching post:', error);
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

        // Trouver l'utilisateur propriétaire du poste
        const utilisateur = await Utilisateur.findByPk(poste.user_id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Supprimer les détails du poste
        await Postedetails.destroy({ where: { post_id: id } });

        // Supprimer les échanges liés au poste et leurs détails
        const echanges = await db.Echange.findAll({ where: { post_id: id } });
        for (const echange of echanges) {
            // Supprimer les détails de chaque échange
            await db.EchangeDetail.destroy({ where: { echange_id: echange.id } });
            // Supprimer l'échange
            await echange.destroy();
        }

        // Supprimer le poste
        await poste.destroy();

        // Créer une notification pour l'utilisateur
        const notification = new Notification({
            user_id: utilisateur.user_id,
            message: `Votre poste "${poste.titre}" a été supprimé par l'administrateur.`,
            created_at: new Date()
        });
        await notification.save();

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error.message);
        console.error('Stack trace:', error.stack);

        res.status(500).json({
            message: 'Error deleting post',
            error: error.message
        });
    }
};

exports.getByIdUtilisateur = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const { dateDebut, dateFin, texte, nomObjet, categorieObjet, status, sortByDate } = req.query;

        const filters = { user_id: userId };
        const includeFilters = [];

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

        if (texte) {
            filters[Op.or] = [
                { titre: { [Op.iLike]: `%${texte}%` } },
                { description: { [Op.iLike]: `%${texte}%` } }
            ];
        }

        if (status && status !== undefined) {
            filters.status = status;
        }

        if (nomObjet || categorieObjet) {
            includeFilters.push({
                model: Postedetails,
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

        const order = [];
        if (sortByDate) {
            order.push(['created_at', sortByDate.toUpperCase()]);
        }

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const { count, rows } = await Poste.findAndCountAll({
            where: filters,
            include: includeFilters,
            limit: limit,
            offset: (page - 1) * limit,
            order: order.length ? order : [['created_at', 'DESC']]
        });

        // Fetch images for each object within the posts
        const postesWithImages = await Promise.all(rows.map(async (post) => {
            const postDetailsWithImages = await Promise.all(post.Postedetails.map(async (detail) => {
                const images = await Image.find({ item_id: detail.Objet.item_id });
                return {
                    ...detail.toJSON(),
                    Objet: {
                        ...detail.Objet.toJSON(),
                        images
                    }
                };
            }));
            return {
                ...post.toJSON(),
                Postedetails: postDetailsWithImages
            };
        }));

        const totalPages = Math.ceil(count / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;

        res.json({
            total: count,
            page: page,
            totalPages,
            hasNext,
            hasPrev,
            data: postesWithImages
        });
    } catch (error) {
        console.error('Error fetching posts by user ID:', error);
        res.status(500).json({ message: 'Error fetching posts by user ID', error });
    }
};
const db = require('../models');
const Image = require('../models/image');
const Poste = db.Poste;
const Postedetails = db.Postedetails;
const Utilisateur = db.Utilisateur;
const Objet = db.Objet;
const Categorie = db.Categorie;
const Notification = require('../models/notification');
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
    const { dateDebut, dateFin, nomUtilisateur, texte, nomObjet, categorieObjet, status, sortByDate } = req.query;

    const filters = {};
    const includeFilters = [];

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

    if (texte) {
        filters[Op.or] = [
            { titre: { [Op.iLike]: `%${texte}%` } },
            { description: { [Op.iLike]: `%${texte}%` } }
        ];
    }

    if (status && status !== undefined) {
        filters.status = status;
    }

    if (nomUtilisateur) {
        includeFilters.push({
            model: Utilisateur,
            as: 'Utilisateur',
            attributes: ['username', 'email'],
            where: {
                username: { [Op.iLike]: `%${nomUtilisateur}%` }
            }
        });
    } else {
        includeFilters.push({
            model: Utilisateur,
            as: 'Utilisateur',
            attributes: ['username', 'email']
        });
    }

    if (nomObjet || categorieObjet) {
        includeFilters.push({
            model: Postedetails,
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

    const order = [];
    if (sortByDate) {
        order.push(['created_at', sortByDate.toUpperCase()]);
    }

    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const { count, rows } = await Poste.findAndCountAll({
            where: filters,
            include: includeFilters,
            limit: limit,
            offset: (page - 1) * limit,
            order: order.length ? order : [['created_at', 'DESC']]
        });

        // Fetch images for each object within the posts
        const postesWithImages = await Promise.all(rows.map(async (post) => {
            const postDetailsWithImages = await Promise.all(post.Postedetails.map(async (detail) => {
                const images = await Image.find({ item_id: detail.Objet.item_id });
                return {
                    ...detail.toJSON(),
                    Objet: {
                        ...detail.Objet.toJSON(),
                        images
                    }
                };
            }));
            return {
                ...post.toJSON(),
                Postedetails: postDetailsWithImages
            };
        }));

        const totalPages = Math.ceil(count / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;

        res.json({
            total: count,
            page: page,
            totalPages,
            hasNext,
            hasPrev,
            data: postesWithImages
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
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
                    as: 'Utilisateur',
                    attributes: ['username', 'email']
                },
                {
                    model: Postedetails,
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
                }
            ]
        });

        if (!poste) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Fetch images for each object within the post
        const postDetailsWithImages = await Promise.all(poste.Postedetails.map(async (detail) => {
            const images = await Image.find({ item_id: detail.Objet.item_id });
            return {
                ...detail.toJSON(),
                Objet: {
                    ...detail.Objet.toJSON(),
                    images
                }
            };
        }));

        // Attach the images to the post details
        const posteWithImages = {
            ...poste.toJSON(),
            Postedetails: postDetailsWithImages
        };

        res.json(posteWithImages);
    } catch (error) {
        console.error('Error fetching post:', error);
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

        // Trouver l'utilisateur propriétaire du poste
        const utilisateur = await Utilisateur.findByPk(poste.user_id);
        if (!utilisateur) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Supprimer les détails du poste
        await Postedetails.destroy({ where: { post_id: id } });

        // Supprimer les échanges liés au poste et leurs détails
        const echanges = await db.Echange.findAll({ where: { post_id: id } });
        for (const echange of echanges) {
            // Supprimer les détails de chaque échange
            await db.EchangeDetail.destroy({ where: { echange_id: echange.id } });
            // Supprimer l'échange
            await echange.destroy();
        }

        // Supprimer le poste
        await poste.destroy();

        // Créer une notification pour l'utilisateur
        const notification = new Notification({
            user_id: utilisateur.user_id,
            message: `Votre poste "${poste.titre}" a été supprimé par l'administrateur.`,
            created_at: new Date()
        });
        await notification.save();

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error.message);
        console.error('Stack trace:', error.stack);

        res.status(500).json({
            message: 'Error deleting post',
            error: error.message
        });
    }
};

exports.getByIdUtilisateur = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const { dateDebut, dateFin, texte, nomObjet, categorieObjet, status, sortByDate } = req.query;

        const filters = { user_id: userId };
        const includeFilters = [];

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

        if (texte) {
            filters[Op.or] = [
                { titre: { [Op.iLike]: `%${texte}%` } },
                { description: { [Op.iLike]: `%${texte}%` } }
            ];
        }

        if (status && status !== undefined) {
            filters.status = status;
        }

        if (nomObjet || categorieObjet) {
            includeFilters.push({
                model: Postedetails,
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

        const order = [];
        if (sortByDate) {
            order.push(['created_at', sortByDate.toUpperCase()]);
        }

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const { count, rows } = await Poste.findAndCountAll({
            where: filters,
            include: includeFilters,
            limit: limit,
            offset: (page - 1) * limit,
            order: order.length ? order : [['created_at', 'DESC']]
        });

        // Fetch images for each object within the posts
        const postesWithImages = await Promise.all(rows.map(async (post) => {
            const postDetailsWithImages = await Promise.all(post.Postedetails.map(async (detail) => {
                const images = await Image.find({ item_id: detail.Objet.item_id });
                return {
                    ...detail.toJSON(),
                    Objet: {
                        ...detail.Objet.toJSON(),
                        images
                    }
                };
            }));
            return {
                ...post.toJSON(),
                Postedetails: postDetailsWithImages
            };
        }));

        const totalPages = Math.ceil(count / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;

        res.json({
            total: count,
            page: page,
            totalPages,
            hasNext,
            hasPrev,
            data: postesWithImages
        });
    } catch (error) {
        console.error('Error fetching posts by user ID:', error);
        res.status(500).json({ message: 'Error fetching posts by user ID', error });
    }
};
