const mongoose = require("mongoose");

async function connectToDb() {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);
    console.log("Db connected successfully");
  } catch (error) {
    console.log("DB connection error");
    console.log(error);
  }
}

module.exports = { connectToDb };
