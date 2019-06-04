const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  order: {
    type: String,
    required: true
  }
});
const Donor = mongoose.model("Donor", donorSchema);
module.exports = { Donor };
