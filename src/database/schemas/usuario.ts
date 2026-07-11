import { Association, DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";

class Usuario extends Model {
  declare public id: string;
  declare codigos: Produto[];

  declare static associations: {
    codigos: Association<Usuario, Produto>;
  };
}

class Produto extends Model {
  declare public id: string;
  declare public usuarioId: string;
  declare public nome: string;
  declare public codigo: string;
  declare public ultimaAtualizacao: string;
}

Usuario.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "usuario",
    timestamps: false,
  }
);

Produto.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
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
  {
    sequelize,
    modelName: "produto",
    timestamps: false,
  }
);

Usuario.hasMany(Produto, {
  as: "codigos",
  foreignKey: "usuarioId",
  onDelete: "CASCADE",
});
Produto.belongsTo(Usuario, { foreignKey: "usuarioId" });

export { Usuario, Produto };