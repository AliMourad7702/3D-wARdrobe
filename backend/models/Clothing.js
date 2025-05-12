const mongoose = require('mongoose');

const clothingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL'],
        required: true,
    },

    path: {
        type: String,
        required: true,
    },
    thumbnailPath: {
        type: String,
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
    positionX: {
        type: Number,
        required: true,
    },
    positionY: {
        type: Number,
        required: true,
    },
    positionZ: {
        type: Number,
        required: true,
    },

});
const Clothing = mongoose.model('clothings', clothingSchema);

module.exports = Clothing;