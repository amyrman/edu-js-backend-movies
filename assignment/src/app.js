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
    label: "Tickets",
    link: "",
  },
  {
    label: "Movies",
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

app.get('/', async (request, response) => {
  response.render("index", { menu: menuWithActive(request.path) });
});

app.get('/movies', async (request, response) => {
  const movies = await loadAllMovies();
  response.render("allmovies", { movies, menu: menuWithActive(request.path) });
});

app.get('/movies/:Id', async (request, response) => {
  const movie = await loadSingleMovie(request.params.Id);
  if (movie) {
    response.render("singleMovie", { movie, menu: menuWithActive(request.path)});
  } else {
    response.status(404).render("404");
  }
});

app.use(express.static('public'))

// Used 404 handling according to Express FAQ: http://expressjs.com/en/starter/faq.html
app.use((request, response, next) => {
  response.status(404).render("404")
});

export default app;
