module.exports = app => {
  // HOME PAGE (with login links)
  app.use(require("./home"));

  // // LOGIN ===============================
  app.use(require("./login"));

  // SIGNUP =============================
  app.use(require("./signup"));

  // PAYSTACK ==============================
  app.use(require("./paystack"));

  // CONTACT PAGE ==============================
  app.use(require("./contact"));

  // ABOUT US =======================================
  app.get("/about-us", (req, res) => {
    res.render("about-us");
  });

  // TRACKING =======================================
  app.get("/tracking", (req, res) => {
    res.render("404");
  });

  // PRICING PLANS =======================================
  app.get("/pricing-plans", (req, res) => {
    res.render("pricing-plans");
  });
  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get("/index", isLoggedIn, (req, res) => {
    res.render("index.ejs", {
      user: req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};

// route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.redirect("/");
};
