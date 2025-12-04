import { Pool } from "pg";
import fs from "fs";
import path from "path";

const caCert = fs.readFileSync(path.join(process.cwd(), "src/lib/certs/ca.pem")).toString();

const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: {
    rejectUnauthorized: true, 
    ca: caCert,
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const pgTypes = require("pg").types;
pgTypes.setTypeParser(pgTypes.builtins.TIMESTAMP, (val: string) => val);
pgTypes.setTypeParser(pgTypes.builtins.TIMESTAMPTZ, (val: string) => val);
pgTypes.setTypeParser(pgTypes.builtins.TIME, (val: string) => val);
pgTypes.setTypeParser(pgTypes.builtins.DATE, (val: string) => val);

pool.on("connect", () => {
  console.log("✅ Conectado a PostgreSQL:", process.env.PG_HOST);
});

pool.on("error", (err) => {
  console.error("❌ Error en el pool de PostgreSQL:", err);
});

export default pool;