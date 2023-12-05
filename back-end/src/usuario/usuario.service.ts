import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async create(usuario: Usuario): Promise<Usuario> {
    try {
      const existingUser = await this.usuarioRepository.findOne({ where: { cpf: usuario.cpf } });
  
      if (existingUser) {
        throw new HttpException('CPF já cadastrado. Por favor, verifique o CPF e tente novamente.', HttpStatus.BAD_REQUEST);
      }
  
      const newUser = await this.usuarioRepository.save(usuario);
      return newUser;
    } catch (error) {
      throw new HttpException('CPF já cadastrado. Por favor, verifique o CPF e tente novamente.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async userDelete(id: number): Promise<void> {
    try {
      const result = await this.usuarioRepository.delete(id);

      if (result.affected === 0) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      throw new HttpException('Erro ao excluir usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUsersDetails(id: number): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { id } });
  }
  
  async userUpdate(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }
  
}
