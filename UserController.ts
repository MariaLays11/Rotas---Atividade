
import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import User from '../models/User';

const userRepository = AppDataSource.getRepository(User);

export default {
  async create(req: Request, res: Response) {
    try {
      const user = userRepository.create(req.body);
      const result = await userRepository.save(user);
      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await userRepository.delete(id);
      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const users = await userRepository.find();
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userRepository.findOneBy({ id });
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let user = await userRepository.findOneBy({ id });
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      userRepository.merge(user, req.body); 
      const result = await userRepository.save(user);

      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },
};
