import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";

const app = express();

// Add markdown support for use in rendering movie info from API
app.engine("handlebars", engine({
  helpers: {
    markdown: md => marked(md),
  },
}));
app.set("view engine", "handlebars");
app.set("views", "./src/templates");

const menu = [
  {
    label: "Tickets",
    link: "",
  },
  {
    label: "Movies & Events",
    link: "/movies",
  },
  {
    label: "About",
    link: "",
  },
];

app.get('/', async (req, res) => {
  res.render("index");
});

app.get('/allmovies', async (req, res) => {
  res.render("allmovies", { allmovies });
});

app.get('/onemovie:movieId', async (req, res) => {
  res.render("onemovie", { onemovie });
});


app.use(express.static('public'))

export default app;
