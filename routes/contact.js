const express = require("express");
const router = express.Router();

router.get("/contact-us", (req, res) => {
  res.render("contact-us"); // load the index.ejs file
});

router.post("/contact-us", (req, res) => {});

module.exports = router;
