const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    height: {
        type: Number,
        required: true,
    },

    weight: {
        type: Number,
        required: true,
    },

    token: {
        type: String,
    },

    role: {
        type: String,
        enum: ['user'],
        default: 'user',
    },

    currentMannequinPath: {
        type: String,
        default: "",
    },

    currentTopPath: {
        type: String,
        default: "",
    },

    currentBottomPath: {
        type: String,
        default: "",
    },

    currentSkinColor: {
        type: String,
        default: "",
    },

    mannequinScaleX: {
        type: Number,
        default: 1.91,
    },
    mannequinScaleY: {
        type: Number,
        default: 1.86,
    },
    mannequinScaleZ: {
        type: Number,
        default: 1.85,
    },

    topScaleX: {
        type: Number,
        default: 0,
    },
    topScaleY: {
        type: Number,
        default: 0,
    },
    topScaleZ: {
        type: Number,
        default: 0,
    },

    topPositionX: {
        type: Number,
        default: 0,
    },
    topPositionY: {
        type: Number,
        default: 0,
    },
    topPositionZ: {
        type: Number,
        default: 0,
    },

    bottomScaleX: {
        type: Number,
        default: 0,
    },
    bottomScaleY: {
        type: Number,
        default: 0,
    },
    bottomScaleZ: {
        type: Number,
        default: 0,
    },

    bottomPositionX: {
        type: Number,
        default: 0,
    },
    bottomPositionY: {
        type: Number,
        default: 0,
    },
    bottomPositionZ: {
        type: Number,
        default: 0,
    },

});

const User = mongoose.model('users', userSchema);

module.exports = User;