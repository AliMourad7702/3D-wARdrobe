const express = require('express');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

router.post('/addToWishlist', wishlistController.addToWishlist);
router.get('/getWishlist/:userId', wishlistController.getWishlist);
router.delete('/removeFromWishlist/:wishlistItemId', wishlistController.removeFromWishlist);

module.exports = router;