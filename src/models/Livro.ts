import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo: string;

  @Column()
  autor: string;

  @Column({ nullable: true })
  genero: string;

  @Column({ type: 'int', nullable: true })
  anoPublicacao: number | null;

  @Column({ default: 'Quero Ler' })
  status: string;

  @ManyToOne(() => User, (user) => user.livros)
  user!: User;

  constructor(titulo: string, autor: string, genero: string, anoPublicacao: number, status: string, user: User) {
    this.titulo = titulo;
    this.autor = autor;
    this.genero = genero;
    this.anoPublicacao = anoPublicacao;
    this.status = status;
    if (user) this.user = user;
  }
}

