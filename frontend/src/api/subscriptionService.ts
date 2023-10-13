export const subscriptionsFetcher = (url: string) =>
  fetch(`${process.env.NEXT_PUBLIC_SUBSCRIPTION_SERVICE}${url}`).then((res) =>
    res.json()
  );

export const magazinesSubscribe = (id: number) =>
  fetch(
    `${process.env.NEXT_PUBLIC_SUBSCRIPTION_SERVICE}/api/v1/magazines/${id}/subscribe`,
    {
      method: "POST",
    }
  ).then((res) => res.json());

export const magazinesCancelSubscription = (id: number) =>
  fetch(
    `${process.env.NEXT_PUBLIC_SUBSCRIPTION_SERVICE}/api/v1/magazines/${id}/cancel-subscription`,
    {
      method: "POST",
    }
  ).then((res) => res.json());
