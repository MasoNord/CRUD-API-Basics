import { config } from 'dotenv';
config();

export const database = {
  connectionLimit: 10,
  host: process.env.DATABASE_HOST || 'host',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'mypassword',
  database: process.env.DATABASE_NAME || 'testdb',
};

export const port = process.env.PORT || 5000;
