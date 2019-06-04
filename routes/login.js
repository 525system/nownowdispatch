const express = require("express");
const router = express.Router();
const passport = require("passport");

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get("/login", (req, res) => {
  // render the page and pass in any flash data if it exists
  res.render("login.ejs", { message: req.flash("loginMessage") });
});

// process the login form
router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/index", // redirect to the secure profile section
    failureRedirect: "/login", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
);

module.exports = router;
