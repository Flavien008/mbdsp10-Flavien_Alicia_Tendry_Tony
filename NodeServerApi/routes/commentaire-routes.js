const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaire-controller');

router.post('/', commentaireController.createCommentaire);
router.get('/poste/:poste_id', commentaireController.getCommentairesByPostId);
router.put('/:id', commentaireController.updateCommentaire);
router.delete('/:id', commentaireController.deleteCommentaire);

module.exports = router;
