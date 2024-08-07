const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentaireSchema = new Schema({
    description: { type: String, required: true },
    auteur_id: { type: String, required: true },
    poste_id: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Commentaire', CommentaireSchema);
