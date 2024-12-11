import { Controller, Get, Post, Body } from '@nestjs/common';
import { Neo4jInstrumentsService } from './neo4j-instruments.service';

@Controller('neo4j')
export class Neo4JExampleController {
    constructor(private readonly neo4jService: Neo4jInstrumentsService) {}

    @Get('')
    async getAllInstruments(): Promise<any> {
        const results = await this.neo4jService.findAll();
        return results;
    }

    @Post('/instrument/create')
    async createInstrument(@Body() instrument: any): Promise<any> {
        const result = await this.neo4jService.createInstrument(instrument);
        return result;
    }
}
