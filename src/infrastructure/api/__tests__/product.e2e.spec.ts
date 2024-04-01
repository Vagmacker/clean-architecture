import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product A",
        price: 100
      });

    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Product B",
        price: 200
      });
  
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const productA = listResponse.body.products[0];
    expect(productA.name).toBe("Product A");
    expect(productA.price).toBe(100);

    const productB = listResponse.body.products[1];
    expect(productB.name).toBe("Product B");
    expect(productB.price).toBe(200);
  });
});
