// libs/backend/features/src/lib/instrument/instrument.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Instrument, InstrumentDocument } from './instrument.schema';
import { ICreateInstrument, IInstrument, IUpdateInstrument } from '@InstrumentRental/shared/api';
import { Neo4jInstrumentsService } from '@InstrumentRental/backend/neo4j'

@Injectable()
export class InstrumentService {
  TAG = 'InstrumentService';

  constructor(
    @InjectModel(Instrument.name)
    private instrumentModel: Model<InstrumentDocument>,
    private neo4jInstrumentsService: Neo4jInstrumentsService
  ) {}

  async getAll(): Promise<IInstrument[]> {
    Logger.log(`Finding all items`, this.TAG);
    const instruments = await this.instrumentModel.find();
    Logger.log(`Found instruments: ${JSON.stringify(instruments, null, 2)}`, this.TAG);
    return instruments;
  }

  async getOne(_id: string): Promise<IInstrument | null> {
    Logger.log(`finding user with id ${_id}`);
    const item = await this.instrumentModel.findOne({ _id }).exec();
    if (!item) {
      Logger.debug('Item not found');
    }
    return item;
  }

  async create(createInstrumentDto: Omit<IInstrument, '_id'>): Promise<IInstrument> {
    Logger.log('create', this.TAG);
    const createdInstrument = new this.instrumentModel({
      ...createInstrumentDto,
      _id: new Types.ObjectId(),
    });

    await this.neo4jInstrumentsService.create(createdInstrument)

    return createdInstrument.save();
  }

  async update(
    id: string,
    updateInstrumentDto: IUpdateInstrument
  ): Promise<IInstrument> {
    Logger.log(`update(${id})`, this.TAG);
    const updatedInstrument = await this.instrumentModel
      .findByIdAndUpdate(id, updateInstrumentDto, { new: true })
      .exec();
    if (!updatedInstrument) {
      throw new NotFoundException(`Instrument could not be found!`);
    }
    return updatedInstrument;
  }

  async delete(id: string): Promise<void> {
    Logger.log(`delete(${id})`, this.TAG);
    const result = await this.instrumentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Instrument could not be found!`);
    }
  }
}
