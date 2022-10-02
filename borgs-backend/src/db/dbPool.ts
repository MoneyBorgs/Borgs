import { Pool, PoolConfig } from 'pg';

// The configuration for this client is being acquired from the .env file
// at borgs-backend
const dbPool = new Pool();

export default dbPool;