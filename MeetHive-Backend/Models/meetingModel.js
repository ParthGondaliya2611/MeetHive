const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  meetingCode: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
