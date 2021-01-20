const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedbackController");

router.post("/", feedbackController.addFeedBack);


module.exports = router;
