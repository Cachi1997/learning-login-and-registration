/* eslint-disable no-undef */
const express = require("express");
const morgan = require("morgan");
const {engine} = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const passport = require("passport");

const { database } = require("./keys");

//initializations
const app = express();
require("./lib/passport");//Para que sepa la autenticacion que estoy creando 

app.set("views", path.join(__dirname, "views"));//Establezco donde va a estar mi carpeta views
app.engine(".hbs", engine({
	defaultLayout: "main",//Aca le digo donde esta el layout por defecto
	layoutsDir: path.join(app.get("views"), "layouts"),//Aca le digo donde encontrar el layout, join une directorios
	partialsDir: path.join(app.get("views"), "partials"),//Aca le digo donde encontrar la carpeta partials
	extname: ".hbs",//aca le digo que los archivops van a terminar en .hbs
	helpers: require("./lib/handlebars")
}));
app.set("view engine", ".hbs");

// Middlewares
app.use(session({
	//Aca estoy almacenando las sesiones en la base de datos
	secret: "mysqlnodesession",
	resave: false, //para que no se renueve la sesion
	saveUninitialized: false, //para que no se vuelva a establecer la sesion
	store: new MySQLStore(database) //aca le decimos que vamos a guardar las sesiones en la base de datos
}));
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());//Para que sepa donde guardar los datos


// Global Variables
app.use((req, res, next) => {
	app.locals.success = req.flash("success");
	app.locals.message = req.flash("message");
	next();
});

// Routes
app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links"));


// Public
app.use(express.static(path.join(__dirname, "public")));

// Starting 
const PORT = process.env.PORT || 4000; // Si existe un puerto en el sistema tomalo, si no, usa el 4000
app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
});