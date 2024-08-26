const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/usersbyrole',authenticateToken, userController.getUsersByRole);
router.put('/:id',authenticateToken, userController.updateUser);
router.delete('/:id',authenticateToken, userController.deleteUser);
router.get('/user/:id',authenticateToken, userController.getUserById);

module.exports = router;
