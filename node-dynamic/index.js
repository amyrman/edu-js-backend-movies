import express from "express";
import fs from "fs/promises";

const app = express();

// Make server respond dynamically -- through actual user input instead of just serving static HTML files. We're rendering HTML on the server and changing (replacing) content dynamically, through external(?) manipulation (aka server side rendering, SSR). The equivalent in the browser environment is; using the DOM API.

// Also, we've renamed the string to replace in content variable (from "name" to "$first_name$") , because replace() method replaces only first occurrence of a string. Earlier, the pattern was not unique which led to bad maintanability / separation -- when moving code around, it stopped working.

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
