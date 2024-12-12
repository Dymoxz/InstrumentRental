import { IEnv } from './env.interface';

export const env: IEnv = {
  production: false,
  webAppUrl: 'http://localhost:4200',
  dataApiUrl: 'http://localhost:3000/api',
  dbConnectionUrl: 'mongodb://localhost:27017/InstrumentRentalDB',
  NEO4J_USER: 'neo4j',
  NEO4J_PASSWORD: '4vIn5AWP9h9PQVwNvUBhHLwWH7i0PzHL5Hdxg0hj5ug'
}
