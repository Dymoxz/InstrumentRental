import { IEnv } from './env.interface';

export const env: IEnv = {
  production: false,
  dataApiUrl: 'http://localhost:3000/api',
  dbConnectionUrl: 'mongodb://localhost:27017/InstrumentRentalDB'
}
