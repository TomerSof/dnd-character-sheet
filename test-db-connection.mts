// test-db-connection.ts
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    await pool.query("SELECT NOW()");
    console.log("Connection successful");
  } catch (e) {
    console.error("Connection failed:", e);
  } finally {
    await pool.end();
  }
}

testConnection();
