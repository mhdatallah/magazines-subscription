import { Model } from "sequelize";
import { Subscription } from "../models";

export const createSubscription = ({
  userId,
  magazineId,
  startDate,
}: {
  userId: string;
  magazineId: number;
  startDate: string;
}) =>
  Subscription.create({
    UserId: userId,
    MagazineId: magazineId,
    startDate,
  });

export const getSubscriptionBySubscriptionId = (
  subscriptionId: string
): Promise<Model<{
  isActive: boolean;
}, any> | null> => Subscription.findByPk(subscriptionId);

export const getSubscriptionsByUserId = (UserId: string) =>
  Subscription.findAll({
    where: {
      UserId,
    },
  });
