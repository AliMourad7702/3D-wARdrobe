const Mannequin = require('../models/Mannequin');

exports.create = async (req, res) => {
    const bodyShape = req.body;
    try {
        const newMannequin = new Mannequin({
            bodyShape,
        })
        await newMannequin.save();
        res.status(200).json({ success: true, message: "Mannequin added successfully!" })
    } catch (error) {
        console.error("Mannequin Adding Error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.fetchByBodyShape = async (req, res) => {
    const bodyShape = req.params.bodyShape;

    try {
        const mannequin = await Mannequin.findOne({ bodyShape })
        if (!mannequin) {
            return res.status(400).json({ error: 'Mannequin Not Found!' })
        }
        res.status(200).json({ success: true, message: "Mannequins Retrieved Successfully", path: mannequin.path })
    } catch (error) {
        console.error("Mannequin Adding Error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.fetchAll = async (req, res) => {
    try {
        const mannequins = await Mannequin.find();
        res.json({ mannequins });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}