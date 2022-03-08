import express from "express";
import fs from "fs/promises"
import Handlebars from "handlebars";

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

  const template = Handlebars.compile(htmlText);
  const rendered = template();

  res.send(rendered);
});

app.use("/", express.static("./static"));

app.listen(5080)
