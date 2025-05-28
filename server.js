import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let projectData = {};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("website"));

app.post("/add", (req, res) => {
  const projectData = req.body;
  res.send(projectData);
});

app.get("/all", async (_, res) => {
  res.send(projectData);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
