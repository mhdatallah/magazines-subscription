import { createConnection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env;

(async () => {
  const connection = await createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
  });
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${MYSQL_DATABASE}\`;`
  );
})().then(() => process.exit(1));
