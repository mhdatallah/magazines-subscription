import { createSubscription, getSubscriptionBySubscriptionId, getSubscriptionsByUserId } from "../database/tables/subscriptions";

describe("Subscription Functions", () => {
  it("should create a subscription", async () => {
    const newSubscription = await createSubscription({
      userId: "1",
      magazineId: 1,
      startDate: new Date().toISOString(),
    });

    expect(newSubscription).toBeDefined();
  });

  it("should get a subscription by ID", async () => {
    const newSubscription = await createSubscription({
      userId: "1",
      magazineId: 1,
      startDate: new Date().toISOString(),
    });

    const subscription = await getSubscriptionBySubscriptionId(newSubscription.get('id') as string);

    expect(subscription).not.toBeNull();
  });

  it("should get subscriptions by user ID", async () => {
    const userId = "2";

    const subscriptions = await getSubscriptionsByUserId(userId);

    expect(Array.isArray(subscriptions)).toBe(true);
  });
});
