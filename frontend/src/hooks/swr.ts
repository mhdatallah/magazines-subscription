import { subscriptionsFetcher } from "@/api/subscriptionService";
import { Magazine, Subscription } from "@/types";
import useSwr, { SWRResponse } from "swr";

export const useMagazines = (): SWRResponse<Magazine[]> =>
  useSwr("/api/v1/magazines", subscriptionsFetcher);

export const useSubscriptions = ({
  userId,
}: {
  userId: number;
}): SWRResponse<Subscription[]> =>
  useSwr(`/api/v1/users/${userId}/subscriptions`, subscriptionsFetcher);
