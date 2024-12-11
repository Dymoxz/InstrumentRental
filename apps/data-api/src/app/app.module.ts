import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  InstrumentModule,
  ReviewModule,
  UserModule,
  RentalModule
} from '@InstrumentRental/backend/features';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from '@InstrumentRental/shared/util-env';
import { AuthModule } from '@InstrumentRental/backend/auth';
import { Neo4jModule } from 'nest-neo4j/dist';
import { Neo4jBackendModule } from '@InstrumentRental/backend/neo4j';

@Module({
  imports: [
    InstrumentModule,
    ReviewModule,
    UserModule,
    AuthModule,
    RentalModule,
    MongooseModule.forRoot(env.dbConnectionUrl, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          // console.log('is connected');
          Logger.verbose(`Mongoose db connected to ${env.dbConnectionUrl}`);
        });
        connection._events.connected();
        return connection;
      },
    }),
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: '855f26bf.databases.neo4j.io',
      port: 7687,
      username: env.NEO4J_USER,
      password: env.NEO4J_PASSWORD
    }),
    Neo4jBackendModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
