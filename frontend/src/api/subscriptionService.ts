export const subscriptionsFetcher = (url: string) =>
  fetch(`${process.env.NEXT_PUBLIC_SUBSCRIPTION_SERVICE}${url}`).then((res) =>
    res.json()
  );

export const magazinesSubscribe = ({
  userId,
  magazineId,
}: {
  userId: number;
  magazineId: number;
}) =>
  fetch(
    `${process.env.NEXT_PUBLIC_SUBSCRIPTION_SERVICE}/api/v1/subscriptions`,
    {
      method: "POST",
      body: JSON.stringify({
        userId,
        magazineId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

export const magazinesCancelSubscription = ({
  subscriptionId,
}: {
  subscriptionId: number;
}) =>
  fetch(
    `${process.env.NEXT_PUBLIC_SUBSCRIPTION_SERVICE}/api/v1/subscriptions/${subscriptionId}/cancel`,
    {
      method: "PUT",
    }
  ).then((res) => res.json());
