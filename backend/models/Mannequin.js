const mongoose = require('mongoose');

const mannequinSchema = new mongoose.Schema({
    bodyShape: {
        type: String,
        required: true,
    },

    path: {
        type: String,
        required: true,
    },

    scaleX: {
        type: Number,
        required: true,
    },
    scaleY: {
        type: Number,
        required: true,
    },
    scaleZ: {
        type: Number,
        required: true,
    },
});

const Mannequin = mongoose.model('mannequins', mannequinSchema);

module.exports = Mannequin;