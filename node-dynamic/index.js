import express from "express";
import fs from "fs/promises";

const app = express();

// Make server respond dynamically -- through actual user input instead of just serving static HTML files. We're rendering HTML on the server and changing (replacing) content dynamically, through external(?) manipulation (aka server side rendering, SSR). The equivalent in the browser environment is; using the DOM API.

// Also, we've renamed the search string in the "content" variable to something unique, from "name" to "$first_name$", because the replace() method replaces only the first occurrence of a string. Earlier, the search string was not unique (just "name") which led to maintanability / separation problems -- when moving code around, it stopped working.

app.get('/', async (request, response) => {
  const first_name = request.query.first_name || 'user';
  const fileBuf = await fs.readFile('./files/index.html');
  const content = fileBuf.toString().replace('$first_name$', first_name)
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
