import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalController } from './rental/rental.controller';
import { Rental, RentalSchema } from './rental/rental.schema';
import { RentalService } from './rental/rental.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rental.name, schema: RentalSchema, collection: 'Rental' },
    ]),
  ],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [RentalService],
})
export class RentalModule {}
