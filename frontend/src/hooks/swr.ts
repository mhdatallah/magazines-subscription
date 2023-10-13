import { Magazine } from "@/types";
import useSwr, { SWRResponse } from "swr";

const subscriptionsFetcher = (url: string) =>
  fetch(`${process.env.NEXT_PUBLIC_SUBSCRIPTION_SERVICE}${url}`).then((res) =>
    res.json()
  );

export const useMagazines = (): SWRResponse<Magazine[]> =>
  useSwr("/api/v1/magazines", subscriptionsFetcher);
