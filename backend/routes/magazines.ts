// magazines.ts
import express, { Request, Response } from "express";
import {
  createMagazine,
  getMagazineByMagazineId,
  listMagazines,
} from "../database/tables/magazines";

const router = express.Router();

// Create a new magazine
router.post("/api/v1/magazines", async (req: Request, res: Response) => {
  try {
    const { title, description, price, publicationDate } = req.body;
    const newMagazine = await createMagazine({
      title,
      description,
      price,
      publicationDate,
    });
    res.json(newMagazine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a magazine." });
  }
});

// List all magazines
router.get("/api/v1/magazines", async (_req: Request, res: Response) => {
  try {
    const magazines = await listMagazines();
    res.json(magazines.filter((mag) => mag.get("isDeleted") !== true));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve magazines." });
  }
});

// Update a magazine
router.put(
  "/api/v1/magazines/:magazineId",
  async (req: Request, res: Response) => {
    const { magazineId } = req.params;
    try {
      const magazine = await getMagazineByMagazineId(magazineId);
      if (magazine) {
        Object.keys(req.body).forEach((key) =>
          magazine.set(key, req.body[key])
        );
        await magazine.save();
        res.json(magazine);
      } else {
        res.status(404).json({ error: "Magazine not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update the magazine." });
    }
  }
);

// Soft delete a magazine
router.delete(
  "/api/v1/magazines/:magazineId",
  async (req: Request, res: Response) => {
    const { magazineId } = req.params;
    try {
      const magazine = await getMagazineByMagazineId(magazineId);
      if (magazine) {
        magazine.set("isDeleted", true);
        await magazine.save();
        res.sendStatus(200);
      } else {
        res.status(404).json({ error: "Magazine not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete magazine." });
    }
  }
);

export default router;
