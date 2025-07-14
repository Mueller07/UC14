// src/controllers/LivroController.ts
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../database/data-source';
import { Livro } from '../models/Livro';
import { User } from '../models/User';

export class LivroController {
  private livroRepository = AppDataSource.getRepository(Livro);
  private userRepository = AppDataSource.getRepository(User);

  async createLivro(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { titulo, autor, genero, anoPublicacao, status, userId } = req.body;

      if (!titulo || !autor || !userId) {
        res.status(400).json({ mensagem: 'Título, autor e usuário são obrigatórios.' });
        return;
      }

      const user = await this.userRepository.findOneBy({ id: userId });

      if (!user) {
        res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        return;
      }

      const livro = this.livroRepository.create(new Livro(titulo, autor, genero, anoPublicacao, status, user));
      await this.livroRepository.save(livro);

      res.status(201).json(livro);
    } catch (error) {
      next(error);
    }
  }

  async getLivros(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.query;

      if (!userId) {
        res.status(400).json({ mensagem: 'userId é obrigatório.' });
        return;
      }

      const livros = await this.livroRepository.find({ where: { user: { id: Number(userId) } } });
      res.json(livros);
    } catch (error) {
      next(error);
    }
  }

  async getLivroById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const livro = await this.livroRepository.findOne({ where: { id: Number(req.params.id) }, relations: ['user'] });

      if (!livro) {
        res.status(404).json({ mensagem: 'Livro não encontrado.' });
        return;
      }

      res.json(livro);
    } catch (error) {
      next(error);
    }
  }

  async updateLivro(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const livro = await this.livroRepository.findOneBy({ id: Number(req.params.id) });

      if (!livro) {
        res.status(404).json({ mensagem: 'Livro não encontrado.' });
        return;
      }

      this.livroRepository.merge(livro, req.body);
      const resultado = await this.livroRepository.save(livro);

      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  async deleteLivro(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resultado = await this.livroRepository.delete(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}
