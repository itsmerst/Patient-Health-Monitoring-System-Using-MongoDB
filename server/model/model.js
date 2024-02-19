const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    sparse: true,
  },
  address: {
    type: String,
    required: true,
  },
  aadhaar: {
    type: String,
    required: function () {
      return this.role === "patient";
    },
    unique: true,
    sparse: true,
  },
  mobile: {
    type: String,
    required: true,
    sparse: true,
  },
  appdate: {
    type: Date,
    default: "",
  },
  prescription: {
    type: String,
    default: "",
  },
  docname: {
    type: String,
    default: "",
  },
  license: {
    type: String,
    required: function () {
      return this.role === "doctor";
    },
  },
  specialization: {
    type: String,
    required: function () {
      return this.role === "doctor";
    },
  },
  licenseInfo: {
    type: String,
    required: function () {
      return this.role === "pharmacist";
    },
  },
  status: {
    type: String,
    default: "inactive",
  },
  password: {
    type: String,
    required: true,
  },
  reportFile: {
    data: Buffer,
    contentType: String,
  },
});

const User = mongoose.model("newUser", schema);

module.exports = User;
