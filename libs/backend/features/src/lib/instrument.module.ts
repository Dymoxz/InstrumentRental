import { Module } from '@nestjs/common';
import { InstrumentController } from './instrument/instrument.controller';
import { InstrumentService } from './instrument/instrument.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Instrument, InstrumentSchema } from './instrument/instrument.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instrument.name, schema: InstrumentSchema, collection: 'Instrument' },
    ]),
  ],
  controllers: [InstrumentController],
  providers: [InstrumentService],
  exports: [InstrumentService],
})
export class InstrumentModule {}
