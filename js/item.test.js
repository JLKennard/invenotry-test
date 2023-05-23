const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { db } = require("...db-configuration-path..");
const Item = require("...item-path...");

// item properties title price description catagory image

// define in global scope
let item;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  item = await Item.create({
    title: "Black Cat",
    price: 150,
    description: "A lovely cat",
    catagory: "pets",
    image: "",
  });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("Creates a new item with correct properties and values", () => {
  it("has an correctproperties", async () => {
    expect(item).toHaveProperty("title");
    expect(item).toHaveProperty("price");
    expect(item).toHaveProperty("description");
    expect(item).toHaveProperty("catagory");
    expect(item).toHaveProperty("image");
  });

  it("hs properties set to correct value", async () => {
    expect(item.title).toBe("Black Cat");
    expect(item.price).toBe(150);
    expect(item.description).toBe("A lovely cat");
    expect(item.catagory).toBe("pets");
    expect(item.image).toBe("");
  });
});

describe("Updates item", () => {
  it("updates item with new values", async () => {
    const updateItem = await Item.update(
      { price: 250, description: "Lovely cat with gold chain" },
      { where: { id: item.id } }
    );
    const findItem = await Item.findByPk(item.id);
    expect(findItem.price).toBe(250);
    expect(findItem.description).toBe("A lovely cat with gold chain");
  });
});

describe("Deletes item", () => {
  it("deletes the item", async () => {
    await Item.destroy({ where: { id: item.id } });
    const findItem = await Item.findByPk(item.id);
    expect(findItem).toBeNull();
  });
});
