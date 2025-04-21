export interface IEnv {
  PORT: number,
  production: boolean,
  webAppUrl: string,
  dataApiUrl: string,
  dbConnectionUrl: string,
  NEO4J_USER: string,
  NEO4J_PASSWORD: string
}
