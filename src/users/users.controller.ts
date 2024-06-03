import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(
    @Body('username') _username: string,
    @Body('password') _password: string,
  ) {
    const { username, id } = await this.usersService.createUser(
      _username,
      _password,
    );
    return { username, id };
  }
}
