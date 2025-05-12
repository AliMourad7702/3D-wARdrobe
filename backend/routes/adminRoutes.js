const express = require("express");
const adminController = require("../controllers/adminController");
const auth = require('../middleware/auth')

const router = express.Router();

router.post("/login", adminController.login);
router.post("/signup", adminController.signup);
router.post('/getTokenAndRole', adminController.getTokenAndRole);

router.use('/home', auth.verifyAdminToken);

module.exports = router;
