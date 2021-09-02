const mongoose = require("mongoose");

const User = mongoose.model("User", {
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
});

module.exports = User;