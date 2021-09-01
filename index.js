require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Express takes two objects, a request and a response
app.get("/", (req, res) => {
    //status refers to HTTP status codes 1xx info, 2xx success, 3xx redirects, 4xx client error, 5xx server error
    res.status(200).send("Hello world");
});

app.listen(port, () => {
    console.log("App is online");
});
