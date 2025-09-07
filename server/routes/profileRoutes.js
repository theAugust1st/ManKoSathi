const express = require("express");
const {protect} = require("../middlewares/authMiddleware.js");
const {updateProfile} = require("../controllers/profileControllers.js");
const router = express.Router();

router.use(protect);
router.route("/profile/update").put(updateProfile)

module.exports = router;