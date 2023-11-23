const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    reflect: {
      type: String,
      required: [true, "reflect is required"],
      minlength: [1, "Min length of reflect is 1"],
      maxlength: [300, "Max length of reflect is 300"],
    },
    isPublic: {
      type: Boolean,
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
      minlength: [8, "Password length should be a min of 8 chars"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ReflectModel = mongoose.model("Reflect", Schema);

module.exports = ReflectModel;
