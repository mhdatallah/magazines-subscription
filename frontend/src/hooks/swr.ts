import { subscriptionsFetcher } from "@/api/subscriptionService";
import { Magazine } from "@/types";
import useSwr, { SWRResponse } from "swr";

export const useMagazines = (): SWRResponse<Magazine[]> =>
  useSwr("/api/v1/magazines", subscriptionsFetcher);
