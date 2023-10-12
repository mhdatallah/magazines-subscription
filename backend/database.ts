import { createPool } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

export const getMagazines = async () => {
  const [rows] = await pool.query(`SELECT * FROM magazines`);
  return rows;
};

export const getMagazine = async (id: number) => {
  const [row] = await pool.query(
    `
  SELECT *
  FROM magazines
  WHERE id = ?
  `,
    [id]
  );
  return row;
};
