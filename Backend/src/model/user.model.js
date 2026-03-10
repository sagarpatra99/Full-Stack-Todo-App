const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profileImg: {
      type: String,
      default:
        "https://imgs.search.brave.com/iqNtMFzPA0AyX1v_QsZwP7kzbrY1HPH4uaWwJl0h1rI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzYwLzI2LzA4/LzM2MF9GXzU2MDI2/MDg4MF9PMVYzUW0y/Y05PNUhXak42Nm1C/aDJOcmxQSE5IT1V4/Vy5qcGc",
    },
  },
  { timestamps: true },
);

const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;
