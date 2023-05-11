var cors = require("cors");
const connectToMongo = require("./db.js");

const express = require("express");

connectToMongo.connectToMongo();

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/bugs", require("./routes/bugs"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
