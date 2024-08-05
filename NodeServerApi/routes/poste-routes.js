const express = require('express');
const router = express.Router();
const posteController = require('../controllers/poste-controller');

router.post('/', posteController.createPoste);
router.get('/', posteController.getPostes);
router.get('/:id', posteController.getPosteById);
router.put('/:id', posteController.updatePoste);
router.delete('/:id', posteController.deletePoste);

module.exports = router;
