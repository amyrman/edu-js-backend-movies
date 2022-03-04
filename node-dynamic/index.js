import express from "express";
import fs from "fs/promises";

const app = express();

// Make server respond dynamically -- through actual user input instead of just serving static HTML files. We're also rendering HTML on the server, that is, changing (replacing) content dynamically, through external(?) manipulation (aka server side rendering, SSR). The equivalent in the browser environment is; using the DOM API. 

app.get('/', async (request, response) => {
  const name = request.query.name || 'user';
  const fileBuf = await fs.readFile('./files/index.html');
  const content = fileBuf.toString().replace('name', name)
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
