const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    clothingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clothing',
        required: true,
    }
});

const Wishlist = new mongoose.model("wishlists", wishlistSchema);

module.exports = Wishlist;