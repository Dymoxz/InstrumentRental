import { Module } from '@nestjs/common';
import { InstrumentController } from './instrument/instrument.controller';
import { InstrumentService } from './instrument/instrument.service';

@Module({
  controllers: [InstrumentController],
  providers: [InstrumentService],
  exports: [InstrumentService],
})
export class InstrumentModule {}
