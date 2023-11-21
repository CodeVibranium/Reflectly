const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    reflect: {
      type: String,
      required: [true, "reflect is required"],
      min: [1, "Min length of reflect is 1"],
      max: [300, "Max length of reflect is 300"],
    },
    isPublic: {
      type: Boolean,
      required: [true, "Is this reflect public?"],
    },
    password: {
      type: String,
      required: function () {
        return !this.isPublic;
      },
      min: [8, "Password length should be a min of 8 chars"],
      max: [16, "Password length should be max of 16 chars"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return !this.isPublic;
      },
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
