import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { User, UserSchema } from '@InstrumentRental/backend/features';
import { UserModule } from '@InstrumentRental/backend/features';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UserModule,
        JwtModule.register({
            secret: process.env['JWT_SECRET'] || 'secretstring',
            signOptions: { expiresIn: '12 days' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
