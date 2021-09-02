require("dotenv").config();
// Logical OR returns first truthy value or the last value
const port = process.env.PORT || 5000;
const { connection } = require("./db");
const saltRounds = 10;

const { addUser, listUsers } = require("./utils/user");
const bcrypt = require("bcrypt");
const express = require("express");
const { rawListeners } = require("./models/user");
const { reset } = require("nodemon");
const app = express();


app.use(express.json()); // Middleware ensures input from useragent is considered to be JSON.


app.post("/register", async (req, res) => {
    // If user enters two different passwords. putting return makes the callback function send that one status then quit
    if (req.body.password !== req.body.checkPassword) {
        return res.status(401).json({"message": "Passwords do not match"});
    } else if (!req.body.username) {
        return res.status(401).json({"message": "No username provided"});
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);

    await addUser(req.body.username, hash);
    res.status(201).json({"users": await listUsers()});
});

app.listen(port, () => {
    connection.once("open", () => {
        console.log("MongoDB connected");
    });
    console.log("Webserver online");
});


// // Express takes two objects, a request and a response
// app.get("/", (req, res) => {
//     //status refers to HTTP status codes 1xx info, 2xx success, 3xx redirects, 4xx client error, 5xx server error
//     res.status(200).send("Hello world");
// });

// app.get("/about", (req, res) => {
//     res.status(200).send("This is the about route");
// });

// Things with a : get put into the req.params object (known as dynamic routes). Queries (?age=50&favcolor=blue) get put into req.query

// Below is code for hashing a password using callbacks
// app.post("/register", (req, res) => {
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//         if (err) {
//             res.status(500).json({"message": "something went wrong", "error": err});
//         }

//         bcrypt.hash(req.body.password, salt, (err, hash) => {
//             if (err) {
//                 res.status(500).json({"message": "something went wrong", "error": err});
//             }
//             bcrypt.compare(req.body.checkPassword, hash, (err, result) => {
//                 if (result) {
//                     res.status(201).json({"message": `Password ${req.body.checkPassword} matches ${hash}`});
//                 } else {
//                     res.status(401).json({"message": `Password ${req.body.checkPassword} does not match ${hash}`});
//                 }
//             });
//         });
//     });
// });


// app.post("/:username/", (req, res) => {
//     res.status(201).json({"message": `repo created: ${req.body.project}`, "data": req.body});
// })

// app.get("/:username/:project", (req, res) => {
//     res.status(200).json({"message": `You've viewed project ${req.params.project} by ${req.params.username}`});
// })

// app.post("/:username/:project", (req, res) => {
//     res.status(200).json({"message": `You updated the project: ${req.params.project}`, "data": req.body});
// })

// // Comparing hashes to an entered password
// if (await bcrypt.compare(req.body.checkPassword, hash)) {
//     res.status(201).json({"message": `Password ${req.body.checkPassword} matches ${hash}`});
// } else {
//     res.status(401).json({"message": `Password ${req.body.checkPassword} does not match ${hash}`});
// }