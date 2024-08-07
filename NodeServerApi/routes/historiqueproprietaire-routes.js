const express = require('express');
const router = express.Router();
const historiqueProprietaireController = require('../controllers/historiqueproprietaire-controller');

// Route to get the ownership history of an object
router.get('/objet/:objet_id', historiqueProprietaireController.getHistoriqueByObjet);

module.exports = router;
