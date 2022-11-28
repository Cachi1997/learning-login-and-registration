const express = require("express");
const { reset } = require("nodemon");
const pool = require("../database");
const router = express.Router();
const db = require("../database");

router.get("/add", (req,res) => {
	res.render("links/add");
});

router.post("/add", async (req, res) => {
	const {title, url, description} = req.body;
	const newLink = {
		title,
		url,
		description
	};
	await pool.query("INSERT INTO links set ?", [newLink]);
	req.flash("success", "Link saved succesfully");
	res.redirect("/links");
});

router.get("/delete/:id", async (req, res) => {
	const {id} = req.params;
	await pool.query("DELETE FROM links WHERE ID = ?", [id]);
	req.flash("success", "Link Removed Succesfully");

	res.redirect("/links");
});

router.get("/edit/:id", async (req, res) => {
	const {id} = req.params;
	const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
	res.render("links/edit", {link: links[0]}); 
});

router.post("/edit/:id", async(req, res) => {
	const { id } = req.params;
	const {title, url, description} = req.body;
	const newLink = {
		title,
		url,
		description
	};
	await pool.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
	req.flash("success", "Link Updated Succesfully");
	res.redirect("/links"); 
});

//No es el root, ya que le precede el prefijo /links
router.get("/", async (req, res) => {
	const links = await pool.query("SELECT * FROM links");
	res.render("links/list", {links: links});
});

module.exports = router;