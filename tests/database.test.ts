import { Sequelize, DataTypes } from "sequelize";
import CorreiosDB, { IUsuario } from "../src/database/operations";
import { Usuario, Produto } from "../src/database/schemas/usuario";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "bun:test";

let sequelize: Sequelize;

beforeAll(async () => {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  Usuario.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
    },
    { sequelize, modelName: "usuario", timestamps: false }
  );

  Produto.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4, 
      },
      usuarioId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ultimaAtualizacao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "produto", timestamps: false }
  );

  Usuario.hasMany(Produto, {
    as: "codigos",
    foreignKey: "usuarioId",
    onDelete: "CASCADE",
  });
  Produto.belongsTo(Usuario, { foreignKey: "usuarioId" });

  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

afterEach(async () => {
  await Produto.destroy({ where: {} });
  await Usuario.destroy({ where: {} });
});

describe("CorreiosDB", () => {
  it("deve criar usuário e produto", async () => {
    const snowflake = "123456789012345678";
    const result = await CorreiosDB.create(snowflake, "Pacote", "AB123", "10:00");

    expect(result.nome).toBe("Pacote");
    expect(result.codigo).toBe("AB123");
    expect(result.usuarioId).toBe(snowflake);
  });

  it("deve buscar usuário com seus códigos", async () => {
    const snowflake = "987654321098765432";
    await CorreiosDB.create(snowflake, "Pacote A", "CD456", "11:00");
    await CorreiosDB.append(snowflake, "Pacote B", "EF789", "12:00");

    const user = (await CorreiosDB.search(snowflake)) as IUsuario;

    expect(user.id).toBe(snowflake);
    expect(user.codigos).toHaveLength(2);
    expect(user.codigos.map((c) => c.codigo)).toContain("CD456");
    expect(user.codigos.map((c) => c.codigo)).toContain("EF789");
  });

  it("deve atualizar um produto", async () => {
    const snowflake = "111222333444555666";
    await CorreiosDB.create(snowflake, "Velho", "GH012", "13:00");
    await CorreiosDB.update(snowflake, "Novo", "GH012", "14:00");

    const user = (await CorreiosDB.search(snowflake)) as IUsuario;

    expect(user.codigos).toHaveLength(1);
    expect(user.codigos[0].nome).toBe("Novo");
    expect(user.codigos[0].ultimaAtualizacao).toBe("14:00");
  });

  it("deve deletar um produto", async () => {
    const snowflake = "999888777666555444";
    await CorreiosDB.create(snowflake, "Deletar", "IJ345", "15:00");
    await CorreiosDB.delete(snowflake, "IJ345");

    const user = (await CorreiosDB.search(snowflake)) as IUsuario;

    expect(user.codigos).toHaveLength(0);
  });

  it("deve retornar nulo ao buscar usuário inexistente", async () => {
    const user = await CorreiosDB.search("000000000000000000");
    expect(user).toBeNull();
  });

  it("deve buscar todos os usuários com seus códigos", async () => {
    const snowflake1 = "100100100100100100";
    const snowflake2 = "200200200200200200";

    await CorreiosDB.create(snowflake1, "Pacote 1", "AA", "10:00");
    await CorreiosDB.create(snowflake2, "Pacote 2", "BB", "11:00");

    const users = await CorreiosDB.all();

    expect(users).toHaveLength(2);
    expect(users.map((u) => u.id)).toContain(snowflake1);
    expect(users.map((u) => u.id)).toContain(snowflake2);
  });
});