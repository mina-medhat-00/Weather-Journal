const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
let projectData = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("website"));
app.use(cors());

app.post("/add", async (req, res) => {
  const body = await req.body;
  projectData = body;
  res.send(projectData);
});

app.get("/all", async (req, res) => {
  res.send(projectData);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
