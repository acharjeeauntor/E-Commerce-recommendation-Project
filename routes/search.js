const express = require("express");
const router = express.Router();

const searchController = require("../controllers/searchController");

// router.post("/search", searchController.searchResult);

router.post("/search", searchController.searchResult);

router.get("/product", searchController.getProduct);


module.exports = router;
