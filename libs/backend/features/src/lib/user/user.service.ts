import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { IUser, ICreateUser, IUpdateUser } from '@InstrumentRental/shared/api';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async getAll(): Promise<IUser[]> {
    this.logger.log('Finding all users');
    const users = await this.userModel.find().exec();
    this.logger.log(`Found users: ${JSON.stringify(users, null, 2)}`);
    return users;
  }

  async getOne(email: string): Promise<IUser | null> {
    this.logger.log(`Finding user with email ${email}`);
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      this.logger.debug('User not found');
      return null;
    }
    return user;
  }

  async create(createUserDto: ICreateUser): Promise<IUser> {
    this.logger.log('Creating a new user');
    const createdUser = new this.userModel({
      ...createUserDto,
      _id: new Types.ObjectId(),
    });
    return createdUser.save();
  }

  async update(id: string, updateUserDto: IUpdateUser): Promise<IUser> {
    this.logger.log(`Updating user with id ${id}`);
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User could not be found!`);
    }
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting user with id ${id}`);
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`User could not be found!`);
    }
  }
}
