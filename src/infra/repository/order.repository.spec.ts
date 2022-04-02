import { Sequelize } from "sequelize-typescript";

describe("Order Repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });
  
});
