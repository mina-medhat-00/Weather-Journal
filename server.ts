import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
let data = {};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("src"));

app.post("/add", (req, res) => {
  data = req.body;
  res.send(data);
});

app.get("/all", async (_, res) => {
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Server running on ws://localhost:${PORT}`);
});
