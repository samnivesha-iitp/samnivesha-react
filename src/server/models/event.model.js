const mongoose = require("mongoose");

const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    organiser: [{ type: String }],
    place: {
      type: String,
      default: "Tutorial Block",
    },
    date: {
      type: Date,
      default: Date.now,
      required: false,
    },
    timing: { type: String, default: "will be updated" },
    rulebook: String,
    isgroupallowed: { type: Boolean, default: false },
    poster: { type: String, default: "/images/Lensart_.png" },
    tagline: String,
    description: String,
    groups: [{ type: ObjectId, ref: "Group", default: [] }],
    maxMembersAllowed: Number,
    contact: { type: Number, default: 8090206021 },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
