import { Controller, Post, Get, Delete, Put, Body, HttpException, HttpStatus, Param, NotFoundException } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('listar')
  async getUsers(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get('detalhes/:id')
  async getUsersDetails(@Param('id') id: number): Promise<Usuario> {
    const usuario = await this.usuarioService.getUsersDetails(id);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  @Post('/cadastrar')
  async postUser(@Body() usuario: Usuario): Promise<Usuario> {
    try {
      return await this.usuarioService.create(usuario);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  @Delete('/excluir/:id')
  async userDelete(@Param('id') id: number) {
    await this.usuarioService.userDelete(id);
    return { message: 'Usuário excluído com sucesso.' };
  }

  @Put('atualizar/:id')
  async atualizarUsuario(@Param('id') id: number, @Body() usuario: Usuario): Promise<Usuario> {

    const userExisting = await this.usuarioService.getUsersDetails(id);
    if (!userExisting) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    userExisting.nome = usuario.nome;
    userExisting.email = usuario.email;
    userExisting.dataNascimento = usuario.dataNascimento;
    userExisting.genero = usuario.genero;
    userExisting.cpf = usuario.cpf;

    return this.usuarioService.userUpdate(userExisting);
  }
}