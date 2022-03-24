import request from "supertest";
import app from "../app.js"

// Tests that we would've wished having before 
test("movie page shows list of movies", async () => {
  const response = await request(app)
  .get("/movies")
  .expect(200);

  expect(response.text.includes('Shawshank')).toBeTruthy();
  expect(response.text.includes('Godfather')).toBeTruthy();
})

test("single movie page shows movie data", async () => {
  const response = await request(app)
  .get("/movies/1")
  .expect(200);

  expect(response.text.includes('Shawshank')).toBeTruthy();
})
