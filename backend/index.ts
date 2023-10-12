import express, { Request, Response, ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import { createMagazine, getMagazine, getMagazines, updateMagazine } from "./database";

//For env File
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/magazines", async (req: Request, res: Response) => {
  const magazines = await getMagazines();
  res.send(magazines);
});

app.get("/magazines/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const magazine = await getMagazine(+id);
  res.send(magazine);
});

app.post("/magazines", async (req: Request, res: Response) => {
  const { title } = req.body;
  const magazine = await createMagazine({ title });
  res.send(magazine);
});

app.post("/magazines/:id", async (req: Request, res: Response) => {
  const { title, id, is_deleted, is_subscribed } = req.body;
  const magazine = await updateMagazine({ id, title, is_deleted, is_subscribed });
  res.send(magazine);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
