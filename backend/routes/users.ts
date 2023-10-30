// magazines.ts
import express, { Request, Response } from "express";
import { createUser } from "../database/tables/users";
import { getSubscriptionsByUserId } from "../database/tables/subscriptions";

const router = express.Router();

// Create a new user
router.route("/").post(async (req: Request, res: Response) => {
  try {
    const { username, email, passwordHash } = req.body;
    const newUser = await createUser({ username, email, passwordHash });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a user." });
  }
});

// List user subscriptions (current and past)
router
  .route("/:userId/subscriptions")
  .get(async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const subscriptions = await getSubscriptionsByUserId(userId);
      res.json(subscriptions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve subscriptions." });
    }
  });

export default router;
