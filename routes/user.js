const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const saltRounds = 10;
const { addUser, listUsers } = require("../utils/user");

router.get("/", async (req, res) => {
    res.status(200).json({"users": await listUsers()});
});

router.get("/:id", (req, res) => {
    res.status(200).json({"msg": `Attempting to get user ${req.params.id}`});
});

router.post("/register", async (req, res) => {
    if (req.body.password !== req.body.checkPassword) {
        return res.status(401).json({"msg": "Passwords do not match"});
    } else if (!req.body.username) {
        return res.status(401).json({"msg": "No username provided"});
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);

    await addUser(req.body.username, hash);
    res.status(201).json({"msg": "Created user"});
});

module.exports = router;