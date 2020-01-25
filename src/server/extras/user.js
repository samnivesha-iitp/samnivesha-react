const User = require("../models/user.model");

export async function workshopRegistration(userId, payload) {
  try {
    const user = await User.findById(userId).exec();
    user.workshop = payload;
    await user.save();
    return true;
  } catch (err) {
    return false;
  }
}
