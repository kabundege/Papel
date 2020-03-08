import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
// pool.on('connect', () => process.stdout.write('server connected'));
export default pool;
