import express from "express";
import fs from "fs/promises";

const app = express();

app.get('/', async (request, response) => {
  const fileBuf = await fs.readFile('./files/index.html');
  response.type('html');
  response.send(fileBuf);
});

// Make server respond dynamically -- through actual user input instead of just serving static HTML files. We're also rendering HTML on the server, that is, changing (replacing) content dynamically, through external(?) manipulation (aka server side rendering, SSR). The equivalent in the browser environment is; using the DOM API. 
// Dynamic changes are also possible with query strings and then "/hello?name=" as a path:
  // app.get('/hello', async (request, response) => {
  // const name = request.query.name;
app.get('/:name', async (request, response) => {
  const name = request.params.name;
  const fileBuf = await fs.readFile('./files/index.html');
  const content = fileBuf.toString().replace('Anders', name)
  response.type('html');
  response.send(content);
});

app.get('/*', async (request, response) => {
  try {
  const fileName = request.path;
  const fileBuf = await fs.readFile(`./files/${fileName}`);
  const type = fileName.split('.')[1];
  response.type(type);
  response.send(fileBuf);
  } catch (err) {
    response.status(404).end();
  }
});

app.listen(5080);
