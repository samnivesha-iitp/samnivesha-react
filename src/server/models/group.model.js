const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const groupSchema = new Schema(
  {
    groupleader: { type: ObjectId, ref: "User", unique: true },
    groupmembers: [{ type: ObjectId, ref: "User" }],
    event: { type: ObjectId, ref: "Event" }
  },
  { timestamps: true }
);
const Group = new mongoose.model("Group", groupSchema);

module.exports = Group;
