import {Pool, types} from 'pg';
import {builtins} from "pg-types";

// The configuration for this client is being acquired from the .env file
// at borgs-backend
// @ts-ignore
types.setTypeParser(builtins.NUMERIC, parseFloat);
const dbPool = new Pool();

export default dbPool;