import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
