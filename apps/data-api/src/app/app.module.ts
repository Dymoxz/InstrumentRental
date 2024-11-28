import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstrumentModule } from '@InstrumentRental/backend/features';
import { ReviewModule } from '@InstrumentRental/backend/features';

@Module({
  imports: [InstrumentModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
