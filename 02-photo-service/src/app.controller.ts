import { Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service.js';
import { AuthService } from './auth/auth.service.js';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    // return this.authService.login(req.user);
    const token = this.authService.login(req.user);
    console.log(`access token ${token}`);
    return token;
  }
}
