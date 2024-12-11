import { Module } from '@nestjs/common';
import { InstrumentController } from './instrument/instrument.controller';
import { InstrumentService } from './instrument/instrument.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Instrument, InstrumentSchema } from './instrument/instrument.schema';
import { Neo4jInstrumentsService } from '@InstrumentRental/backend/neo4j';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instrument.name, schema: InstrumentSchema, collection: 'Instrument' },
    ]),
  ],
  controllers: [InstrumentController],
  providers: [InstrumentService, Neo4jInstrumentsService],
  exports: [InstrumentService],
})
export class InstrumentModule {}
