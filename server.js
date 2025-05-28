import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let data = {};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("website"));

app.post("/add", (req, res) => {
  data = req.body;
  res.send(data);
});

app.get("/all", async (_, res) => {
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server running on  http://127.0.0.1:${port}`);
});
