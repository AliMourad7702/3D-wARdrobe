const express = require('express');
const mannequinController = require('../controllers/mannequinController');

const router = express.Router();

router.get("/fetchAll", mannequinController.fetchAll);
router.get("/fetchByBodyShape/:bodyShape", mannequinController.fetchByBodyShape);
router.post("/create", mannequinController.create);


module.exports = router;