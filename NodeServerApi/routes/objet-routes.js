const express = require('express');
const router = express.Router();
const objetController = require('../controllers/objet-controller');

router.post('/', objetController.createObjet);
router.get('/', objetController.getObjets);
router.get('/:id', objetController.getObjetById);
router.put('/:id', objetController.updateObjet);
router.delete('/:id', objetController.deleteObjet);
router.get('/users/:userId', objetController.getObjetsByUser);

module.exports = router;
