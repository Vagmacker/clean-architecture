import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product A",
  price: 100
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    input.name = "";
    input.price = 100;

    await expect(usecase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is less than 0", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    input.name = 'Product A'
    input.price = -1;

    await expect(usecase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
