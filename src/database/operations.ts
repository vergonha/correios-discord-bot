import logger from "../logger.js";
import { Usuario, Produto } from "./schemas/usuario.js";

export interface IProduto {
  id: string;
  usuarioId: string;
  nome: string;
  codigo: string;
  ultimaAtualizacao: string;
}

export interface IUsuario {
  id: string;
  codigos: IProduto[];
}

const CorreiosDB = {
  create: async (id: string, name: string, code: string, time: string) => {
    await Usuario.findOrCreate({
      where: { id: id },
    });

    return await Produto.create({
      usuarioId: id,
      nome: name,
      codigo: code,
      ultimaAtualizacao: time,
    });
  },

  append: async (id: string, name: string, code: string, time: string) => {
    return await Produto.create({
      usuarioId: id,
      nome: name,
      codigo: code,
      ultimaAtualizacao: time,
    });
  },

  update: async (id: string, name: string, code: string, time: string) => {
    return await Produto.update(
      {
        nome: name,
        ultimaAtualizacao: time,
      },
      {
        where: {
          usuarioId: String(id).trim(),
          codigo: String(code).trim(),
        },
      }
    );
  },

  delete: async (id: string, code: string) => {
    return await Produto.destroy({
      where: {
        usuarioId: id,
        codigo: code,
      },
    });
  },

  search: async (id: string): Promise<IUsuario | null> => {
    const user = await Usuario.findOne({
      where: { id },
      include: [{ model: Produto, as: "codigos" }],
    });

    if (!user) return null;

    const userData = user.get({ plain: true }) as any;

    return {
      id: userData.id.toString(),
      codigos: userData.codigos || [],
    };
  },

  all: async (): Promise<IUsuario[]> => {
    const users = await Usuario.findAll({
      include: [{ model: Produto, as: "codigos" }],
    });

    return users.map((user) => {
      const userData = user.get({ plain: true }) as any;
      return {
        id: userData.id.toString(),
        codigos: userData.codigos || [],
      };
    });
  },
};

export default CorreiosDB;