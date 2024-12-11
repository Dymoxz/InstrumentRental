import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { Neo4JExampleController } from './neo4j.controller';
import { Neo4jInstrumentsService } from './neo4j-instruments.service';

@Module({
    imports: [Neo4jModule],
    controllers: [Neo4JExampleController],
    providers: [Neo4jInstrumentsService],
    exports: []
})
export class Neo4jBackendModule {}
