import request from "supertest";
import app from "../app.js"

test("home page shows list of movies", async () => {
  const response = await request(app)
  .get("/")
  .expect(200);
})
