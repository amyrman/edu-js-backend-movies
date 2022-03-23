import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";
import { loadAllMovies, loadSingleMovie } from "./movies.js";

const app = express();

// Add markdown support for use in rendering movie info from API
app.engine("handlebars", engine({
  helpers: {
    markdown: function (md) {
      return marked(md);
    },
  },
}));
app.set("view engine", "handlebars");
app.set("views", "./src/templates");

const menu = [
  {
    label: "Home",
    link: "/",
  },
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

function menuWithActive(path) {
  return menu.map(function (item) {
      return {
        link: item.link,
        label: item.label,
        active: item.link == path,
      };
    });
}

app.get('/', async (req, res) => {
  res.render("index", { menu: menuWithActive(req.path) });
});

app.get('/movies', async (req, res) => {
  const movies = await loadAllMovies();
  res.render("allmovies", { movies, menu: menuWithActive(req.path) });
});

app.get('/movies/:Id', async (req, res) => {
  const movie = await loadSingleMovie(req.params.Id);
  console.log("Test output: " +movie);
  if (movie) {
    res.render("singleMovie", { movie, menu: menuWithActive(req.path)});
  } else {
    res.status(404).render("404");
  }
});

app.use(express.static('public'))

// Used 404 handling according to Express FAQ: http://expressjs.com/en/starter/faq.html
app.use((req, res, next) => {
  res.status(404).render("404")
})

export default app;
