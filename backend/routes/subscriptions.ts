// magazines.ts
import express, { Request, Response } from "express";
import { createSubscription, getSubscriptionBySubscriptionId, getSubscriptionsByUserId } from "../database/tables/subscriptions";

const router = express.Router();

// Subscribe to a magazine
router.post("/api/v1/subscriptions", async (req: Request, res: Response) => {
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
router.put(
  "/api/v1/subscriptions/:subscriptionId/cancel",
  async (req: Request, res: Response) => {
    const { subscriptionId } = req.params;
    try {
      const subscription = await getSubscriptionBySubscriptionId(
        subscriptionId
      );
      if (subscription) {
        subscription.set('isActive', false);
        subscription.set('endDate' , new Date().toISOString())
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
router.get(
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

export default router;
