import {drizzle} from 'drizzle-orm/neon-http';
import {neon} from "@neondatabase/serverless";

import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, {schema});//connectino via drizzle

export {sql}// raw sql query via neon