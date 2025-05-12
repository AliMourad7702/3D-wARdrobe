const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const wishlistController = require('./wishlistController');

exports.signup = async (req, res) => {
    const { email, password, weight, height } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    try {
        const newUser = new User({ email, password: hashedPassword, height, weight });
        await newUser.save();
        res.status(200).json({ success: true, message: "User Registered successfully!" })
    } catch (error) {
        console.error("User Registration Error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET_USER, {
            expiresIn: 86400,
        });
        await User.updateOne({ "_id": user._id }, { $set: { "token": token } });
        res.status(200).json({
            success: true,
            token,
            height: user.height,
            weight: user.weight,
            mannequinPath: user.currentMannequinPath,
            topPath: user.currentTopPath,
            bottomPath: user.currentBottomPath,
            skinColor: user.currentSkinColor,
            mannequinScaleX: user.mannequinScaleX,
            mannequinScaleY: user.mannequinScaleY,
            mannequinScaleZ: user.mannequinScaleZ,
            topScaleX: user.topScaleX,
            topScaleY: user.topScaleY,
            topScaleZ: user.topScaleZ,
            topPositionX: user.topPositionX,
            topPositionY: user.topPositionY,
            topPositionZ: user.topPositionZ,
            bottomScaleX: user.bottomScaleX,
            bottomScaleY: user.bottomScaleY,
            bottomScaleZ: user.bottomScaleZ,
            bottomPositionX: user.bottomPositionX,
            bottomPositionY: user.bottomPositionY,
            bottomPositionZ: user.bottomPositionZ,
        });
    } catch (error) {
        console.error("Login Error: ", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.getTokenAndRole = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        };

        res.status(200).json({
            role: user.role,
            token: user.token,
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.addToUserWishlist = async (req, res) => {
    const email = req.params.email;
    const { clothingId } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User Not Found!' })
        }

        const result = await wishlistController.addToWishlist(userId, clothingId);
        res.status(200).json(result);
    } catch (error) {
        console.error("User Wishlist Item Adding Error: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.setPreferences = async (req, res) => {
    const email = req.params.email;
    const {
        mannequinPath,
        topPath,
        bottomPath,
        height,
        weight,
        skinColor,
        mannequinScaleX,
        mannequinScaleY,
        mannequinScaleZ,
        topScaleX,
        topScaleY,
        topScaleZ,
        topPositionX,
        topPositionY,
        topPositionZ,
        bottomScaleX,
        bottomScaleY,
        bottomScaleZ,
        bottomPositionX,
        bottomPositionY,
        bottomPositionZ,
    } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User Not Found!' })
        }
        await User.updateOne(
            { "email": user.email },
            {
                $set: {
                    "currentMannequinPath": mannequinPath,
                    "currentTopPath": topPath,
                    "currentBottomPath": bottomPath,
                    "currentSkinColor": skinColor,
                    "height": height,
                    "weight": weight,
                    "mannequinScaleX": mannequinScaleX,
                    "mannequinScaleY": mannequinScaleY,
                    "mannequinScaleZ": mannequinScaleZ,
                    "topScaleX": topScaleX,
                    "topScaleY": topScaleY,
                    "topScaleZ": topScaleZ,
                    "topPositionX": topPositionX,
                    "topPositionY": topPositionY,
                    "topPositionZ": topPositionZ,
                    "bottomScaleX": bottomScaleX,
                    "bottomScaleY": bottomScaleY,
                    "bottomScaleZ": bottomScaleZ,
                    "bottomPositionX": bottomPositionX,
                    "bottomPositionY": bottomPositionY,
                    "bottomPositionZ": bottomPositionZ,
                }
            }
        );

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
