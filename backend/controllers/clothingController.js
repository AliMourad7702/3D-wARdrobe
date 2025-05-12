const Clothing = require("../models/Clothing");

exports.create = async (req, res) => {
    const { name, type, size } = req.body;
    const { path } = req.file.path;
    const { thumbnailPath } = req.file.path;

    if (!path || !thumbnailPath) {
        return res.status(400).json({ error: 'Both 3D model and thumbnail image are required.' });
    }

    try {
        const newClothing = new Clothing({
            name,
            type,
            size,
            path,
            thumbnailPath
        });

        await newClothing.save();
        res.status(200).json({ success: true, message: "Clothing file successfully uploaded!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.fetchAll = async (req, res) => {
    try {
        const clothing = await Clothing.find().sort({ type: -1 });
        res.json({ clothing });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.filterByType = async (req, res) => {
    const type = req.params.type;
    try {
        const clothing = await Clothing.find({ type });
        res.json({ clothing });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.delete = async (req, res) => {
    const clothingId = req.params.clothingId;
    try {
        await Clothing.findByIdAndDelete(clothingId);
        res.status(200).json({ message: 'Clothing deleted successfully.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.update = async (req, res) => {
    try {
        const clothingId = req.params.clothingId;
        const { name, type, size } = req.body;
        const { path } = req.file.path;
        const { thumbnailPath } = req.file.path;

        const clothing = await Clothing.findById(clothingId);
        clothing.name = name;
        clothing.type = type;
        clothing.size = size;
        clothing.path = path;
        clothing.thumbnailPath = thumbnailPath;

        await clothing.save();
        res.status(200).json({ message: 'Clothing updated successfully.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}