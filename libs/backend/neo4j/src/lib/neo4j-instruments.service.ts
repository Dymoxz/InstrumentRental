import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class Neo4jInstrumentsService {
  private readonly logger: Logger = new Logger(Neo4jInstrumentsService.name);

  constructor(private readonly neo4jService: Neo4jService) {}

  async findAll(): Promise<any> {
    this.logger.log('findAll instruments');
    const results = await this.neo4jService.read(
      `MATCH (n) RETURN n`
    );
    const instruments = results.records.map(
      (record: any) => record._fields[0].start.properties
    );
    return instruments;
  }

  async create(instrument: any): Promise<any> {
    this.logger.log('createInstrument');

    // Convert id to string if it exists and ensure it's unique
    const instrumentId = instrument._id ? instrument._id.toString() : null;
    if (!instrumentId) {
      throw new Error('Invalid instrument ID');
    }

    // Ensure the instrument data has valid fields
    const instrumentData = {
      id: instrumentId,
      name: instrument.name,
      type: instrument.type,
      brand: instrument.brand,
      model: instrument.model,
      description: instrument.description,
      pricePerDay: instrument.pricePerDay,
      available: instrument.available,
      ownerEmail: instrument.ownerEmail,
    };

    // Ensure the user node is created or matched based on the unique email
    const userResult = await this.neo4jService.write(
      `MERGE (u:User {email: "${instrumentData.ownerEmail}"}) RETURN u`,
    );
    const userNode = userResult.records[0].get('u');

    // Create the instrument node and establish the relationship
    const result = await this.neo4jService.write(
      `CREATE (i:Instrument {id: "${instrumentData.id}", name: "${instrumentData.name}", type: "${instrumentData.type}", brand: "${instrumentData.brand}", model: "${instrumentData.model}", description: "${instrumentData.description}", pricePerDay: "${instrumentData.pricePerDay}", available: "${instrumentData.available}"})
        MERGE (u:User {email: "${instrumentData.ownerEmail}"})
        MERGE (u)-[:OWNS]->(i)
        RETURN i`
    );

    // Return the created instrument
    return result.records[0].get('i').properties;
  }

  async update(instrument: any): Promise<any> {
    this.logger.log('updateInstrument');

    // Convert id to string if it exists and ensure it's unique
    const instrumentId = instrument._id ? instrument._id.toString() : null;
    if (!instrumentId) {
      throw new Error('Invalid instrument ID');
    }

    // Ensure the instrument data has valid fields
    const instrumentData = {
      id: instrumentId,
      name: instrument.name,
      type: instrument.type,
      brand: instrument.brand,
      model: instrument.model,
      description: instrument.description,
      pricePerDay: instrument.pricePerDay,
      available: instrument.available,
      ownerEmail: instrument.ownerEmail,
    };

    // Update the instrument node
    const result = await this.neo4jService.write(
      `MATCH (i:Instrument {id: "${instrumentData.id}"})
      SET i.name = "${instrumentData.name}",
          i.type = "${instrumentData.type}",
          i.brand = "${instrumentData.brand}",
          i.model = "${instrumentData.model}",
          i.description = "${instrumentData.description}",
          i.pricePerDay = "${instrumentData.pricePerDay}",
          i.available = "${instrumentData.available}"
      RETURN i`
    );

    // Return the updated instrument
    return result.records[0].get('i').properties;
  }

}
