import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/entity/product";
import ProductModel from "./db/sequelize/model/product.model";
import ProductRepository from "./product.repository";

describe("Product repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: 1 } });
    expect(productModel.toJSON()).toStrictEqual({
      id: 1,
      name: "Product 1",
      price: 10,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: 1 } });
    expect(productModel.toJSON()).toStrictEqual({
      id: 1,
      name: "Product 1",
      price: 10,
    });

    product.changeName("Product 2");
    product.changePrice(20);

    await productRepository.update(product);

    const updatedProductModel = await ProductModel.findOne({
      where: { id: 1 },
    });
    expect(updatedProductModel.toJSON()).toStrictEqual({
      id: 1,
      name: "Product 2",
      price: 20,
    });
  });

  it("should find a product by id", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: 1 } });
    expect(productModel.toJSON()).toStrictEqual({
      id: 1,
      name: "Product 1",
      price: 10,
    });

    const foundProduct = await productRepository.findById(1);
    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should findAll products", async () => {
    const productRepository = new ProductRepository();

    const product1 = new Product("1", "Product 1", 10);
    productRepository.create(product1);

    const product2 = new Product("2", "Product 2", 100);
    productRepository.create(product2);

    const products = await productRepository.findAll();
    expect(products).toEqual([product1, product2]);
  });
});
