const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    token: {
        type: String,
    },

    role: {
        type: String,
        enum: ['admin'],
        default: 'admin',
    },
});

const Admin = mongoose.model('admins', adminSchema);

module.exports = Admin;