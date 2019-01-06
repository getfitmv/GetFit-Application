const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const moment = require("moment");
require("dotenv").config();

const SALT_I = 10;

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true,
    maxlength: 30
  },

  lastname: {
    type: String,
    required: true,
    maxlength: 30
  },

  cart: {
    type: Array,
    default: []
  },

  history: {
    type: Array,
    default: []
  },

  role: {
    type: Number,
    default: 0
  },

  gender: {
    type: Number,
    required: false
  },

  token: {
    type: String
  },
  resetToken: {
    type: String
  },
  resetTokenExp: {
    type: Number
  }
});

UserSchema.pre("save", function(next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_I, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.generateNewToken = function(cb) {
  var user = this;

  crypto.randomBytes(20, function(err, buffer) {
    var token = buffer.toString("hex");

    var today = moment()
      .startOf("day")
      .valueOf();
    var exp = moment(today)
      .endOf("day")
      .valueOf();

    user.resetToken = token;
    user.resetTokenExp = exp;

    user.save(function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.generateToken = function(cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

UserSchema.statics.findByToken = function(token, cb) {
  var user = this;
  jwt.verify(token, process.env.SECRET, function(err, decode) {
    user.findOne({ _id: decode, token: token }, function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("user", UserSchema);
module.exports = { User };
