import { RowDataPacket, createPool } from "mysql2";
import dotenv from "dotenv";
import { MAGAZINES_TABLE } from "./constants";

// Types & Interfaces
interface Magazine {
  id: number;
  title: string;
  is_deleted: boolean;
  is_subscribed: boolean;
}

// Config

dotenv.config();
const pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

// Magazines CRUD

export const createMagazine = async ({ title }: { title: string }) => {
  const [row] = await pool.query(
    `
  INSERT INTO ${MAGAZINES_TABLE} (title)
  VALUES (?)
  `,
    [title]
  );
  const createdMagazine = await getMagazine((row as RowDataPacket).insertId);
  return createdMagazine;
};
export const getMagazines = async () => {
  const [rows] = await pool.query(`
  SELECT id, title, CAST(is_deleted AS UNSIGNED) AS is_deleted, CAST(is_subscribed AS UNSIGNED) AS is_subscribed
  FROM ${MAGAZINES_TABLE}`);
  return (rows as RowDataPacket[]).map((row) => convertRow(row));
};
export const getMagazine = async (id: number) => {
  const [row] = await pool.query(
    `
    SELECT id, title, CAST(is_deleted AS UNSIGNED) AS is_deleted, CAST(is_subscribed AS UNSIGNED) AS is_subscribed
    FROM ${MAGAZINES_TABLE}
    WHERE id = ?
    `,
    [id]
  );

  return (row as RowDataPacket[]).map((row) => convertRow(row))[0];
};
export const updateMagazine = async ({
  id,
  is_deleted,
  is_subscribed,
  title,
}: Magazine) => {
  const isDeletedBit = is_deleted ? 1 : 0;
  const isSubscribedBit = is_subscribed ? 1 : 0;

  await pool.query(
    `
  UPDATE ${MAGAZINES_TABLE}
  SET title = ?, is_deleted = ?, is_subscribed = ?
  WHERE id = ?
  `,
    [title, isDeletedBit, isSubscribedBit, id]
  );

  return await getMagazine(id);
};
export const deleteMagazine = async (id: number) => {
  await pool.query(
    `
  UPDATE ${MAGAZINES_TABLE}
  SET is_deleted = 1
  WHERE id = ?
  `,
    [id]
  );

  return await getMagazine(id);
};

// Utils

const convertRow = (row: RowDataPacket) => {
  return {
    ...row,
    is_deleted: row.is_deleted === 1,
    is_subscribed: row.is_subscribed === 1,
  };
};
