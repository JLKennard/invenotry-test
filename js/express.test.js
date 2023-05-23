const request = require("supertest");
const { describe, it, test, expect } = require("@jest/globals");
const { app, item } = require("...app-path...");
const seed = require("...seed-path..."); //

//
beforeAll(async () => {
  await seed();
});

describe("Items Tests", () => {
  it("/item request has succeeded on get", async () => {
    const response = await request(app).get("/item");
    expect(response.status).toBe(200);
  });
  it("/item returns item", async () => {
    const response = await request(app).get("/item");
    expect(response.body[0]).toHaveProperty("title");
    expect(response.body[0]).toHaveProperty("price");
    expect(response.body[0]).toHaveProperty("description");
    expect(response.body[0]).toHaveProperty("catagory");
    expect(response.body[0]).toHaveProperty("image");
  });
});
