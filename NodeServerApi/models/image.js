const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    item_id: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Image', ImageSchema);
