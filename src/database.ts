import { createPool } from 'mysql2/promise';
import { database } from './config';

export const pool = createPool(database);
