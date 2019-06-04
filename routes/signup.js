const express = require("express");
const router = express.Router();
const passport = require("passport");

// show the signup form
router.get("/register", (req, res) => {
  // render the page and pass in any flash data if it exists
  res.render("register.ejs", { message: req.flash("signupMessage") });
});

// process the signup form
router.post(
  "/register",
  passport.authenticate("local-signup", {
    successRedirect: "/index", // redirect to the secure profile section
    failureRedirect: "/register", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
);

module.exports = router;
