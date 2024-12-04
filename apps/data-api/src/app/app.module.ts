import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  InstrumentModule,
  ReviewModule,
  UserModule,
} from '@InstrumentRental/backend/features';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from '@InstrumentRental/shared/util-env';
import { AuthModule } from '@InstrumentRental/backend/auth';

@Module({
  imports: [
    InstrumentModule,
    ReviewModule,
    UserModule,
    AuthModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
