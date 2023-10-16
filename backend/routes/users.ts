// magazines.ts
import express, { Request, Response } from "express";
import { createUser } from "../database/tables/users";

const router = express.Router();

// Create a new user
router.post("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const { username, email, passwordHash } = req.body;
    const newUser = await createUser({ username, email, passwordHash });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a user." });
  }
});

export default router;
