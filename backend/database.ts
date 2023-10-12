import { RowDataPacket, createPool } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

export const getMagazines = async () => {
  const [rows] = await pool.query(`
  SELECT id, title, CAST(is_deleted AS UNSIGNED) AS is_deleted, CAST(is_subscribed AS UNSIGNED) AS is_subscribed
  FROM magazines`);
  return (rows as RowDataPacket[]).map((row) => convertRow(row));
};
export const getMagazine = async (id: number) => {
  const [row] = await pool.query(
    `
    SELECT id, title, CAST(is_deleted AS UNSIGNED) AS is_deleted, CAST(is_subscribed AS UNSIGNED) AS is_subscribed
    FROM magazines
    WHERE id = ?
    `,
    [id]
  );

  return (row as RowDataPacket[]).map((row) => convertRow(row));
};
export const createMagazine = async ({ title }: { title: string }) => {
  const [row] = await pool.query(
    `
  INSERT INTO magazines (title)
  VALUES (?)
  `,
    [title]
  );
  const [createdMagazine] = await getMagazine((row as RowDataPacket).insertId);
  return createdMagazine;
};

const convertRow = (row: RowDataPacket) => {
  return {
    ...row,
    is_deleted: row.is_deleted === 1,
    is_subscribed: row.is_subscribed === 1,
  };
};
