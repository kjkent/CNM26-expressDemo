require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const express = require("express");

const app = express();
// Logical OR returns first truthy value or the last value
const port = process.env.PORT || 5000;

app.use(express.json()); // Middleware ensures input from useragent is considered to be JSON.

// Express takes two objects, a request and a response
app.get("/", (req, res) => {
    //status refers to HTTP status codes 1xx info, 2xx success, 3xx redirects, 4xx client error, 5xx server error
    res.status(200).send("Hello world");
});

// app.get("/about", (req, res) => {
//     res.status(200).send("This is the about route");
// });

// Things with a : get put into the req.params object (known as dynamic routes). Queries (?age=50&favcolor=blue) get put into req.query

app.post("/register", (req, res) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            res.status(500).json({"message": "something went wrong", "error": err});
        }

        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                res.status(500).json({"message": "something went wrong", "error": err})
            }
            res.status(201).json({"message": `Hashed password for ${req.body.username} is: ${hash}`});
        })
    })
})

app.post("/:username/", (req, res) => {
    res.status(201).json({"message": `repo created: ${req.body.project}`, "data": req.body});
})

app.get("/:username/:project", (req, res) => {
    res.status(200).json({"message": `You've viewed project ${req.params.project} by ${req.params.username}`});
})

app.post("/:username/:project", (req, res) => {
    res.status(200).json({"message": `You updated the project: ${req.params.project}`, "data": req.body});
})


app.listen(port, () => {
    console.log("App is online");
});
