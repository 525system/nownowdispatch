const express = require("express");
const router = express.Router();
const { Donor } = require("../models/user");
const request = require("request");
const _ = require("lodash");
const { initializePayment, verifyPayment } = require("../config/paystack")(
  request
);
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "thankgodegbo@gmail.com",
//     pass: "1thing2some"
//   }
// });

router.post("/paystack/pay", (req, res) => {
  const form = _.pick(req.body, [`order`, `amount`, `email`, `name`]);
  form.metadata = {
    name: form.name,
    order: form.order
  };
  form.amount *= 100;
  initializePayment(form, (error, body) => {
    if (error) {
      //handle errors
      console.log(error);
      return;
    }
    response = JSON.parse(body);
    res.redirect(response.data.authorization_url);
  });
});

router.get("/paystack/callback", (req, res) => {
  const ref = req.query.reference;
  verifyPayment(ref, (error, body) => {
    if (error) {
      //handle errors appropriately
      console.log(error);
      return res.redirect("/error");
    }
    response = JSON.parse(body);
    const data = _.at(response.data, [
      "reference",
      "metadata.order",
      "amount",
      "customer.email",
      "metadata.name"
    ]);
    [reference, order, amount, email, name] = data;
    newDonor = { order, reference, amount, email, name };
    console.log(newDonor);
    const donor = new Donor(newDonor);
    donor
      .save()
      .then(donor => {
        if (donor) {
          res.redirect("/receipt/" + donor._id);
        }
      })
      .catch(e => {
        res.redirect("/error");
      });
  });
});

router.get("/receipt/:id", (req, res) => {
  const id = req.params.id;
  Donor.findById(id)
    .then(donor => {
      if (!donor) {
        //handle error when the donor is not found
        res.redirect("/error");
      }
      res.render("success");
      // const mailOptions = {
      //   from: email, // sender address
      //   to: "egbo.thankgod@yahoo.com", // list of receivers
      //   subject: "New order from" + " " + name, // Subject line
      //   html: name + " " + "Placed an oder for" + " " + order // plain text body
      // };
      // transporter.sendMail(mailOptions, function(err, info) {
      //   if (err) console.log(err);
      //   else console.log(info);
      // });
    })
    .catch(e => {
      res.redirect("/error");
    });
});

module.exports = router;
