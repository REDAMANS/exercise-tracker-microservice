const mongoose = require('mongoose');
const DATABASE_URI = "mongodb+srv://redamans357:bDrss8uoUXLbCXWC@cluster0.ljd7573.mongodb.net/?retryWrites=true&w=majority";

const connectDb = async () => {
  try {
    await mongoose.connect(DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDb