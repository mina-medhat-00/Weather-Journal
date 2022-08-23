/*---Setup Modules---*/
// create empty JS object as endpoint for all routes
let projectData = {};
const bodyParser = require("body-parser");
// import express module to run both routes and server
const express = require("express");
// start up instance of an app
const app = express();
const port = 3000;

/*---Middleware---*/
// configure express to use bodyParser as middleware
// app.use() always used as middleware
app.use(bodyParser.json());
// we don't need to use the extended URL
app.use(bodyParser.urlencoded({ extended: false }));
// to tell node that main folder initilaized is website
app.use(express.static("website"));

// importing CORS for cross origin allowance
const cors = require("cors");
// start using cors
app.use(cors());

app.post("/add", async function (req, res) {
  const body = await req.body;
  projectData = body;
  res.send(projectData);
});

app.get("/all", async function (req, res) {
  res.send(projectData);
});

// server listening when running
app.listen(port, function () {
  console.log(`server running...\nlistening in port ${port}`);
});
