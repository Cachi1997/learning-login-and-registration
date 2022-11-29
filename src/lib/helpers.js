const helpers = {};
const bcrypt = require("bcryptjs");

helpers.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);  //Generate hash, 10 is the time the hash algorithm takes to create a patern
	const finalPassword = await bcrypt.hash(password, salt); //Here i call a method that returns the password encrypted
	return finalPassword;
};

helpers.matchPassword = async (password, savedPassword) => {
	try {
		await bcrypt.compare(password, savedPassword);
	} catch (e) {
		console.log(e);
	}
};

module.exports = helpers;