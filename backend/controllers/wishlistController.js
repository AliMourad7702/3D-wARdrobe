const Wishlist = require('../models/Wishlist');

exports.addToWishlist = async (userId, clothingId) => {
    try {
        const wishlistItem = new Wishlist({ userId, clothingId });
        await wishlistItem.save();
        return { success: true, message: "Item Added To Wishlist!" };
    } catch (error) {
        console.error("Wishlist Item Adding Error: ", error.message)
        return { success: false, message: error.message };
    }
}

exports.getWishlist = async (req, res) => {
    const { userId } = req.params;
    try {
        const userWishlist = await Wishlist.find({ userId }).populate("clothingId");
        res.status(200).json({ success: true, userWishlist });
    } catch (error) {
        console.error("Wishlist Retrieval Error: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.removeFromWishlist = async (req, res) => {
    const { wishlistItemId } = req.params;
    try {
        await Wishlist.findByIdAndRemove(wishlistItemId);
        res.status(200).json({ success: true, message: "Item removed from wishlist" });
    } catch (error) {
        console.error("Wishlist Item Removal Error: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

