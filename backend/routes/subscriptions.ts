// magazines.ts
import express, { Request, Response } from "express";
import {
  createSubscription,
  getSubscriptionBySubscriptionId,
} from "../database/tables/subscriptions";

const router = express.Router();

// Subscribe to a magazine
router.route("/").post(async (req: Request, res: Response) => {
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

router
  .route("/:subscriptionId/cancel")
  // Cancel a subscription (set isActive to false)
  .put(async (req: Request, res: Response) => {
    const { subscriptionId } = req.params;
    try {
      const subscription = await getSubscriptionBySubscriptionId(
        subscriptionId
      );
      if (subscription) {
        subscription.set("isActive", false);
        subscription.set("endDate", new Date().toISOString());
        await subscription.save();
        res.json(subscription);
      } else {
        res.status(404).json({ error: "Subscription not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to cancel the subscription." });
    }
  });

export default router;
