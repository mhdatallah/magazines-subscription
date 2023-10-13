import express, { Request, Response } from "express";
import dotenv from "dotenv";
import {
  createMagazine,
  getMagazine,
  getMagazines,
  updateMagazine,
} from "./database";

//For env File
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get("/api/v1/magazines", async (_req: Request, res: Response) => {
  const magazines = await getMagazines();
  res.send(magazines);
});

app.get("/api/v1/magazines/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const magazine = await getMagazine(+id);
  res.send(magazine);
});

app.post("/api/v1/magazines", async (req: Request, res: Response) => {
  const { title } = req.body;
  const magazine = await createMagazine({ title });
  res.status(201).send(magazine);
});

app.post("/api/v1/magazines/:id", async (req: Request, res: Response) => {
  const { title, id, is_deleted, is_subscribed } = req.body;
  const magazine = await updateMagazine({
    id,
    title,
    is_deleted,
    is_subscribed,
  });
  res.send(magazine);
});

// This is not RESTful

app.post("/api/v1/magazines/:id/subscribe", async (req: Request, res: Response) => {
  const id = req.params.id;
  const magazine = await getMagazine(+id);
  const updatedMagazine = await updateMagazine({ ...magazine, is_subscribed: true });
  res.send(updatedMagazine);
});
app.post("/api/v1/magazines/:id/cancel-subscription", async (req: Request, res: Response) => {
  const id = req.params.id;
  const magazine = await getMagazine(+id);
  const updatedMagazine = await updateMagazine({ ...magazine, is_subscribed: false });
  res.send(updatedMagazine);
});

app.delete("/api/v1/magazines/:id", async (_req: Request, res: Response) => {
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
