const Notification = require('../models/notification');
const { Utilisateur } = require('../models'); // Assurez-vous que ce modèle est correct et importé

exports.createNotification = async (req, res) => {
    const { user_id, message } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await Utilisateur.findByPk(user_id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const newNotification = new Notification({
            user_id,
            message
        });

        await newNotification.save();
        res.status(201).json({ message: 'Notification created successfully', notification: newNotification });
    } catch (error) {
        res.status(500).json({ message: 'Error creating notification', error });
    }
};

exports.getNotificationsByUserId = async (req, res) => {
    const { user_id } = req.params;

    try {
        const notifications = await Notification.find({ user_id });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};

exports.updateNotification = async (req, res) => {
    const { id } = req.params;
    const { read } = req.body;

    try {
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.read = read;
        await notification.save();

        res.json({ message: 'Notification updated successfully', notification });
    } catch (error) {
        res.status(500).json({ message: 'Error updating notification', error });
    }
};

exports.deleteNotification = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        await notification.remove();
        res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notification', error });
    }
};
