const mongoose = require("mongoose");

const si = new mongoose.Schema({
  emaill: {
    type: String,
    required: true,
  },
  passs: {
    type: String,
    required: true,
    unique: true 
  }
});

module.exports = mongoose.model("In", si);