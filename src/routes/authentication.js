const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
	res.render("auth/signup");
});

router.post("/signup", (req, res) => {
	res.send("recieved");
});

module.exports = router;