import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalController } from './rental/rental.controller';
import { Rental, RentalSchema } from './rental/rental.schema';
import { RentalService } from './rental/rental.service';
import { Neo4jRentalsService } from '@InstrumentRental/backend/neo4j';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rental.name, schema: RentalSchema, collection: 'Rental' },
    ]),
  ],
  controllers: [RentalController],
  providers: [RentalService, Neo4jRentalsService],
  exports: [RentalService],
})
export class RentalModule {}
