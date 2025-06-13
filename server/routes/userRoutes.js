const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware.js");
const { addFavoriteQuote,getFavoriteQuotes,removeFavoriteQuote} = require("../controllers/userControllers.js");
router.use(protect);
router.route("/profile/favorites").post(addFavoriteQuote).get(getFavoriteQuotes);
router.route("/profile/favorites/:quoteId").delete(removeFavoriteQuote)

module.exports = router;
