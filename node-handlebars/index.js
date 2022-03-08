import express from "express";
import fs from "fs/promises"

const app = express();


app.get("/", async (req, res) => {
  const htmlBuf = await fs.readFile("./templates/index.html");
  const htmlText = htmlBuf.toString();

  res.send(htmlText);
});

app.use("/", express.static("./static"));

app.listen(5080)
