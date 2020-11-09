import { Pool } from "pg";
import dotenv from "dotenv";
import { connectionString } from "../settings";

dotenv.config();

const config = {
  connectionString,
  // maximum number of clients the pool should contain
  max: 5,
  min: 0,
};

export const pool = new Pool(config);
