const express = require('express');
const router = express.Router();
const echangeController = require('../controllers/echange-controller');

router.post('/', echangeController.createEchange);
router.get('/', echangeController.getEchanges);
router.get('/:id', echangeController.getEchangeById);
router.put('/:id', echangeController.updateEchange);
router.delete('/:id', echangeController.deleteEchange);
router.get('/post/:post_id', echangeController.getEchangesByPoste); 

module.exports = router;
