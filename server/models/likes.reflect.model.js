const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    reflect: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reflect",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

Schema.index({ reflect: 1, user: 1 }, { unique: true });

const LikesModel = mongoose.model("ReflectLikes", Schema);

module.exports = LikesModel;
