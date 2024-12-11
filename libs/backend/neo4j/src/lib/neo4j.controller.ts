import { Controller, Get, Post, Body } from '@nestjs/common';
import { Neo4jInstrumentsService } from './neo4j-instruments.service';
import { Neo4jRentalsService } from './neo4j-rentals.service';
import { IRental } from '@InstrumentRental/shared/api';

@Controller('neo4j')
export class Neo4JExampleController {
    constructor(
        private readonly neo4jInstrumentsService: Neo4jInstrumentsService,
        private readonly neo4jRentalsService: Neo4jRentalsService
    ) {}

    @Get('')
    async getAllInstruments(): Promise<any> {
        const results = await this.neo4jInstrumentsService.findAll();
        return results;
    }

    @Post('/instrument/create')
    async createInstrument(@Body() instrument: any): Promise<any> {
        const result = await this.neo4jInstrumentsService.create(instrument);
        return result;
    }

    @Post('/rental/create')
    async createRental(@Body() rental: IRental): Promise<any> {
        const result = await this.neo4jRentalsService.create(rental);
        return result;
    }
}
