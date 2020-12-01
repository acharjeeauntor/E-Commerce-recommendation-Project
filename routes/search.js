const express = require("express");
const router = express.Router();

const searchController = require("../controllers/searchController");

// router.post("/search", searchController.searchResult);

router.post("/search", searchController.searchResult);

router.post("/search/rating", searchController.searchResultByRating);

router.post("/search/price", searchController.searchResultByPrice);

router.post("/search/filter", searchController.filterResultByPriceAndRating);

router.get("/catagory", searchController.getCatagory);

router.get("/product", searchController.getProduct);


module.exports = router;
