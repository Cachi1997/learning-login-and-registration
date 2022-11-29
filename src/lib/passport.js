const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("../lib/helpers");

//The authentication it's made locally (usando mi bd)
passport.use("local.signup", new LocalStrategy({
	usernameField: "username",
	passwordField: "password",
	passReqToCallback: true
}, async(req, username, password, done) => {
	const { fullname } = req.body;
	const newUser = {
		username,
		password,
		fullname
	};
	newUser.password = await helpers.encryptPassword(password);
	const result = await pool.query("INSERT INTO users SET ?", [newUser]); //Store the new user into the database
	newUser.id = result.insertId;
	return done(null, newUser); //Null because there was no error, and the new user to store in a session
}));

//Store the user in a session
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
	done(null, rows[0]);
});