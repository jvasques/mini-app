import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
const settings = require('../ormconfig.js');


@Module({
  imports: [
    TypeOrmModule.forRoot(settings),
    UsuarioModule,
  ],
})
export class AppModule {}
