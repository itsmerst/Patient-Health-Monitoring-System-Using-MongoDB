const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongodb connection string
    console.log("MongoDB URI:", process.env.MONGO_URI);
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
