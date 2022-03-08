import express from "express";
import fs from "fs/promises"

const app = express();

const menu = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'About us',
    link: '/about',
  },
  {
    label: 'Contact us',
    link: '/contact',
  },
];

app.get("/", async (req, res) => {
  const htmlBuf = await fs.readFile("./templates/index.html");
  const htmlText = htmlBuf.toString();

  res.send(htmlText);
});

app.use("/", express.static("./static"));

app.listen(5080)
