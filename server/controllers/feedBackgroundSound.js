const asyncHandler = require("../utils/asyncHandler.js");
const BackgroundSound = require('../models/backgroundSound.js');

const feedBackgroundSound = asyncHandler(async (req, res, next) => {
    const { name, category, audioUrl } = req.body;

    if (!name || !category || !audioUrl) {
        return res.status(400).json({
            message: "Please provide all required fields: name, category, and audioUrl."
        });
    }

    const existingSound = await BackgroundSound.findOne({ name });
    if (existingSound) {
        return res.status(409).json({
            message: `A sound with the name "${name}" already exists.`
        });
    }

    const newSound = await BackgroundSound.create({
        name,
        category,
        audioUrl
    });

    return res.status(201).json({
        message: "Background sound created successfully!",
        data: newSound
    });
});

module.exports = { feedBackgroundSound };