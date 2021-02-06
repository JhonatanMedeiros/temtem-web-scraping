export interface IConfig {
  MAX_CONNECTIONS: number;
  RATE_LIMIT: number;
  URL: string;
  database: {
    MONGODB_DOMAIN: string;
    MONGODB_DB_MAIN: string;
    MONGODB_DB_USER: string;
    MONGODB_DB_PASS: string;
  };
}

const config: IConfig = {
  MAX_CONNECTIONS: 1,
  RATE_LIMIT: 5000,
  URL: 'https://temtem.gamepedia.com/Temtem_(creatures)',
  database: {
    MONGODB_DOMAIN: process.env.MONGODB_DOMAIN || 'localhost:17017',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'temtem_database',
    MONGODB_DB_USER: process.env.MONGODB_DB_USER || '',
    MONGODB_DB_PASS: process.env.MONGODB_DB_PASS || ''
  }
};

export default config;
