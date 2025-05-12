const express = require("express");
const multer = require('multer');
const clothingController = require("../controllers/clothingController");


const router = express.Router();
router.post("/create",clothingController.create);
router.get("/fetchAll", clothingController.fetchAll);
router.get("/filter/:type", clothingController.filterByType);
router.delete("/delete/:clothingId", clothingController.delete);

module.exports = router;
