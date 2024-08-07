const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification-controller');

router.post('/', notificationController.createNotification);
router.get('/user/:user_id', notificationController.getNotificationsByUserId);
router.put('/:id', notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
