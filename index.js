const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

require("./config/passport")(passport); // pass passport for configuration
const config = require("./config/database");

app.use(express.static("views"));

// set up our express application
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs"); // set up ejs for templating

// required for passport
app.use(
  session({
    secret: "ilovescotchscotchyscotchscotch",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use((req, res, next) => {
  res.locals.login = req.isAuthenticated();
  next();
});

// routes ======================================================================
require("./routes/index")(app, passport); // load our routes and pass in our app and fully configured passport

// connect to db
mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("Database Connection Successful");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App running at port 3000");
});
