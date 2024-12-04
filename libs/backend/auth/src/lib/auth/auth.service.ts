import { Injectable, Logger } from '@nestjs/common';
import {
    ConflictException,
    UnauthorizedException
} from '@nestjs/common/exceptions';
import {
    User as UserModel,
    UserDocument
} from '@InstrumentRental/backend/features';
import { JwtService } from '@nestjs/jwt';
import { IUserCredentials, IUserIdentity } from '@InstrumentRental/shared/api';
import { CreateUserDto } from '@InstrumentRental/backend/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    //
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) {}

    async validateUser(credentials: IUserCredentials): Promise<any> {
        this.logger.log('validateUser');
        const user = await this.userModel.findOne({
            email: credentials.email
        });
        if (user && user.password === credentials.password) {
            return user;
        }
        return null;
    }

    async login(credentials: IUserCredentials): Promise<IUserIdentity> {
        this.logger.log('login ' + credentials.email);
        return await this.userModel
            .findOne({
              email: credentials.email
            })
            .select('+password')
            .exec()
            .then((user) => {
                if (user && user.password === credentials.password) {
                    const payload = {
                        user_id: user._id
                    };
                    return {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,

                      email: user.email,
                        token: this.jwtService.sign(payload)
                    };
                } else {
                    const errMsg = 'Email not found or password invalid';
                    this.logger.debug(errMsg);
                    throw new UnauthorizedException(errMsg);
                }
            })
            .catch((error) => {
                return error;
            });
    }

  async register(user: CreateUserDto): Promise<IUserIdentity> {
    this.logger.log(`Register user ${user.email}`);

    if (await this.userModel.findOne({ email: user.email })) {
        this.logger.debug('User exists');
        throw new ConflictException('User already exists');
    }

    this.logger.debug('User not found, creating');
    const createdUser = await this.userModel.create(user);

    const payload = { email: createdUser.email, sub: createdUser._id };
    this.logger.log('Backend token payload', payload);

    const token = this.jwtService.sign(payload);

    return {
        _id: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        token: token,
    };
}

}
