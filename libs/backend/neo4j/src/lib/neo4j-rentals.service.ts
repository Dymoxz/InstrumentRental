import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { IRental } from '@InstrumentRental/shared/api';

@Injectable()
export class Neo4jRentalsService {
  private readonly logger: Logger = new Logger(Neo4jRentalsService.name);

  constructor(private readonly neo4jService: Neo4jService) {}

  async createRental(rental: IRental): Promise<any> {
    this.logger.log('createRental');

    // Ensure the rental data has valid fields
    const rentalData = {
      instrumentId: rental.instrumentId,
      renterEmail: rental.renterEmail,
    };

    // Ensure the instrument node exists
    const instrumentResult = await this.neo4jService.write(
      `MATCH (i:Instrument {id: "${rentalData.instrumentId}"}) RETURN i`
    );
    if (instrumentResult.records.length === 0) {
      throw new Error('Instrument not found');
    }

    // Ensure the renter user node exists
    const renterResult = await this.neo4jService.write(
      `MATCH (u:User {email: "${rentalData.renterEmail}"}) RETURN u`
    );
    if (renterResult.records.length === 0) {
      throw new Error('Renter not found');
    }

    // Create the relationship between the user and the instrument
    const result = await this.neo4jService.write(
      `MATCH (i:Instrument {id: "${rentalData.instrumentId}"})
        MATCH (u:User {email: "${rentalData.renterEmail}"})
        MERGE (u)-[:RENTS]->(i)
        RETURN i`
    );

    // Return the instrument that was rented
    return result.records[0].get('i').properties;
  }
}
