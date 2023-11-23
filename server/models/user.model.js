const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      minlength: [2, "Min length of 2 chars"],
      maxlength: [60, "Max length of 60 chars"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [8, "Min length of 8 chars"],
      validate: {
        validator: function (password) {
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
          return regex.test(password);
        },
        message: "Please enter a valid password",
      },
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", Schema);
module.exports = UserModel;
