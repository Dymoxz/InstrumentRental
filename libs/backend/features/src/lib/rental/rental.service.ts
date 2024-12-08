// libs/backend/features/src/lib/rental/rental.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IRental, ICreateRental, IUpdateRental } from '@InstrumentRental/shared/api';
import { Rental, RentalDocument } from './rental.schema';

@Injectable()
export class RentalService {
  TAG = 'RentalService';

  constructor(
    @InjectModel(Rental.name)
    private rentalModel: Model<RentalDocument>
  ) {}

  async getAll(): Promise<IRental[]> {
    Logger.log(`Finding all rentals`, this.TAG);
    const rentals = await this.rentalModel.find();
    Logger.log(`Found rentals: ${JSON.stringify(rentals, null, 2)}`, this.TAG);
    return rentals;
  }

  async getOne(_id: string): Promise<IRental | null> {
    Logger.log(`Finding rental with id ${_id}`, this.TAG);
    const rental = await this.rentalModel.findOne({ _id }).exec();
    if (!rental) {
      Logger.debug('Rental not found');
    }
    return rental;
  }

  async create(createRentalDto: ICreateRental): Promise<IRental> {
    Logger.log('Creating rental', this.TAG);
    const createdRental = new this.rentalModel({
      ...createRentalDto,
      _id: new Types.ObjectId(),
    });
    return createdRental.save();
  }

  async update(id: string, updateRentalDto: IUpdateRental): Promise<IRental> {
    Logger.log(`Updating rental with id ${id}`, this.TAG);
    const updatedRental = await this.rentalModel
      .findByIdAndUpdate(id, updateRentalDto, { new: true })
      .exec();
    if (!updatedRental) {
      throw new NotFoundException(`Rental could not be found!`);
    }
    return updatedRental;
  }

  async delete(id: string): Promise<void> {
    Logger.log(`Deleting rental with id ${id}`, this.TAG);
    const result = await this.rentalModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Rental could not be found!`);
    }
  }
}
