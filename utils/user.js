const User = require("../models/user");

exports.addUser = async (uname, hash) => {
    try {
        const newUser = new User({ name: uname, passwordHash: hash });
        await newUser.save();
    } catch(error) {
        console.log(error);
    }
};

exports.listUsers = async () => {
    try {
        return await User.find({});
    } catch(error) {
        console.log(error);
        return [];
    }
}