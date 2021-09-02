require("dotenv").config();
const express = require("express");
const app = express();
// Logical OR returns first truthy value or the last value
const port = process.env.PORT || 5000;

// Express takes two objects, a request and a response
app.get("/", (req, res) => {
    //status refers to HTTP status codes 1xx info, 2xx success, 3xx redirects, 4xx client error, 5xx server error
    res.status(200).send("Hello world");
});

app.get("/about", (req, res) => {
    res.status(200).send("This is the about route");
});
// Things with a : get put into the req.params object (known as dynamic routes). Queries get put into req.query
app.get("/users/:username", (req, res) => {
    res.status(200).send(`You requested info about ${req.params.username}: ${req.query.age}`);
})

app.get("/users/:username/:project", (req, res) => {
    res.status(200).send(`You've requested info about ${req.params.project} created by ${req.params.username}`);
})

app.listen(port, () => {
    console.log("App is online");
});
