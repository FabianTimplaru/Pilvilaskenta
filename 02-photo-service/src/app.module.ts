import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './ormconfig.js';
import { UsersModule } from './users/users.module.js';
import { ProfilesModule } from './profiles/profiles.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [TypeOrmModule.forRoot(OrmConfig), UsersModule, ProfilesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
