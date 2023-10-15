import express, { Request, Response } from "express";
import {
  createMagazine,
  getMagazineByMagazineId,
  listMagazines,
} from "./database/tables/magazines";
import { createUser } from "./database/tables/users";
import {
  createSubscription,
  getSubscriptionBySubscriptionId,
  getSubscriptionsByUserId,
} from "./database/tables/subscriptions";

export const app = express();
app.use(express.json());
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Create a new magazine
app.post("/api/v1/magazines", async (req: Request, res: Response) => {
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
app.get("/api/v1/magazines", async (_req: Request, res: Response) => {
  try {
    const magazines = await listMagazines();
    // @ts-ignore
    res.json(magazines.filter((mag) => mag.isDeleted !== true));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve magazines." });
  }
});

// Update a magazine
app.put(
  "/api/v1/magazines/:magazineId",
  async (req: Request, res: Response) => {
    const { magazineId } = req.params;
    try {
      const magazine = await getMagazineByMagazineId(magazineId);
      if (magazine) {
        // @ts-ignore
        Object.keys(req.body).forEach((key) => (magazine[key] = req.body[key]));
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
app.delete(
  "/api/v1/magazines/:magazineId",
  async (req: Request, res: Response) => {
    const { magazineId } = req.params;
    try {
      const magazine = await getMagazineByMagazineId(magazineId);
      if (magazine) {
        // @ts-ignore
        magazine.isDeleted = true;
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

// Create a new user
app.post("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const { username, email, passwordHash } = req.body;
    const newUser = await createUser({ username, email, passwordHash });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a user." });
  }
});

// Subscribe to a magazine
app.post("/api/v1/subscriptions", async (req: Request, res: Response) => {
  try {
    const { userId, magazineId } = req.body;
    const newSubscription = await createSubscription({
      userId,
      magazineId,
      startDate: new Date().toISOString(),
    });
    res.json(newSubscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a subscription." });
  }
});

// Cancel a subscription (set isActive to false)
app.put(
  "/api/v1/subscriptions/:subscriptionId/cancel",
  async (req: Request, res: Response) => {
    const { subscriptionId } = req.params;
    try {
      const subscription = await getSubscriptionBySubscriptionId(
        subscriptionId
      );
      if (subscription) {
        // @ts-ignore
        subscription.isActive = false;
        // @ts-ignore
        subscription.endDate = new Date().toISOString();
        await subscription.save();
        res.json(subscription);
      } else {
        res.status(404).json({ error: "Subscription not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to cancel the subscription." });
    }
  }
);

// List user subscriptions (current and past)
app.get(
  "/api/v1/users/:userId/subscriptions",
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const subscriptions = await getSubscriptionsByUserId(userId);
      res.json(subscriptions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve subscriptions." });
    }
  }
);
