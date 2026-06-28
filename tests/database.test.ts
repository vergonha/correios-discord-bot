import { Sequelize, DataTypes } from "sequelize";
import CorreiosDB, { IUsuario } from "../src/database/operations";
import { Usuario, Produto } from "../src/database/schemas/usuario";
import { afterAll, beforeAll, expect } from "bun:test";
import { afterEach, describe, it } from "bun:test";

let sequelize: Sequelize;

beforeAll(async () => {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });
    
    Usuario.init(
        { id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false } },
        { sequelize, modelName: "usuario", timestamps: false }
    );

    Produto.init(
        {
            nome: { type: DataTypes.STRING, allowNull: false },
            codigo: { type: DataTypes.STRING, allowNull: false },
            ultimaAtualizacao: { type: DataTypes.STRING, allowNull: false },
        },
        { sequelize, modelName: "produto", timestamps: false }
    );

    Usuario.hasMany(Produto, { as: "codigos", foreignKey: "usuarioId", onDelete: "CASCADE" });
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
        const result = await CorreiosDB.create("1", "Pacote", "AB123", "10:00");

        expect(result.nome).toBe("Pacote");
        expect(result.codigo).toBe("AB123");
    });

    it("deve buscar usuário com seus códigos", async () => {
        await CorreiosDB.create("2", "Pacote A", "CD456", "11:00");
        await CorreiosDB.append("2", "Pacote B", "EF789", "12:00");

        const user = await CorreiosDB.search("2") as IUsuario;

        expect(user.id).toBe("2");
        expect(user.codigos).toHaveLength(2);
    });

    it("deve atualizar um produto", async () => {
        await CorreiosDB.create("3", "Velho", "GH012", "13:00");
        await CorreiosDB.update("3", "Novo", "GH012", "14:00");

        const user = await CorreiosDB.search("3") as IUsuario;
        expect(user.codigos[0].nome).toBe("Novo");
        expect(user?.codigos[0].ultimaAtualizacao).toBe("14:00")
    });

    it("deve deletar um produto", async () => {
        await CorreiosDB.create("4", "Deletar", "IJ345", "15:00");
        await CorreiosDB.delete("4", "IJ345");

        const user = await CorreiosDB.search("4") as IUsuario;
        expect(user.codigos).toHaveLength(0);
    });
});