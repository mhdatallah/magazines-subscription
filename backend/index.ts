import express, {
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
import dotenv from "dotenv";
import { getMagazine, getMagazines } from "./database";

//For env File
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send("Oops 😵");
};
app.use(errorHandler);

app.get("/magazines", async (req: Request, res: Response) => {
  const magazines = await getMagazines();
  res.send(magazines);
});

app.get("/magazines/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const magazine = await getMagazine(+id);
  res.send(magazine);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
