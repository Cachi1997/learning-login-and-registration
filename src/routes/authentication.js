const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/signup", (req, res) => {
	res.render("auth/signup");
});

router.post("/signup", passport.authenticate("local.signup", {
	//Toma el nombre de la autenticacion que creamos, es este caso, se llama local.signup
	successRedirect: "/profile",
	failureReditect: "/signup",
	failureFlash: true
}));

router.get("/signin", (req, res) => {
	res.render("auth/signin");
});

router.post("/signin", (req, res, next) => {
	passport.authenticate("local.signin", {
		successRedirect:"/profile",
		failureRedirect:"/signin",
		failureFlash:true
	})(req, res, next);
});

router.get("/profile", (req, res) => {
	res.send("this is your profile");
});

module.exports = router;