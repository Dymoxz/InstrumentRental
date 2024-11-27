import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstrumentModule } from '@InstrumentRental/backend/features';

@Module({
  imports: [InstrumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
