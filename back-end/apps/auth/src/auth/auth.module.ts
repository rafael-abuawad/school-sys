import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '@app/shared';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('APP_SECRET'),
        signOptions: { expiresIn: '60d' },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [PrismaService, AuthService, JwtStrategy, AuthResolver],
})
export class AuthModule {}
