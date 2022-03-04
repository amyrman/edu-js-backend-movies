import express from 'express';
import fs from 'fs/promises';

const app = express();

// This, together with menuHtml, is here to demonstrate part of maintainability principle (in a very cumbersome way),
// i.e. to loop (.map) through an array and render it in HTML to create an easier way to manipulate data/content --
// To do this as frictionless as possible, in as few places as possible and dynamically / remotely.
// I guess the reason is to show how and why handlebars extension, later on, is a good alternative.
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

async function loadHeader(path) {
  const headerBuf = await fs.readFile("./templates/header.html");
  const headerText = headerBuf.toString();

  const menuHtml = menu.map(item => {
    const activeClass = item.link == path? 'active' : 'inactive';
    return `<li class="${activeClass} menu item"><a href="${item.link}">${item.label}</a></li>`;
  }).join('\n');
  
  return headerText.replace('%menu%', menuHtml);
}

app.get("/", async (req, res) => {
  const headerText = await loadHeader('/');

  const htmlBuf = await fs.readFile("./templates/index.html");
  const htmlText = htmlBuf.toString().replace("%header%", headerText);
  res.send(htmlText);
});

app.get("/about", async (req, res) => {
  const headerText = await loadHeader('/about');

  const htmlBuf = await fs.readFile("./templates/about.html");
  const htmlText = htmlBuf.toString().replace("%header%", headerText);
  res.send(htmlText);
});

app.get("/contact", async (req, res) => {
  const headerText = await loadHeader('/contact');

  const htmlBuf = await fs.readFile("./templates/contact.html");
  const htmlText = htmlBuf.toString().replace("%header%", headerText);
  res.send(htmlText);
});

app.use("/", express.static("./static"));

app.listen(5080);
