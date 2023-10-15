import { User } from "../models";

export const createUser = ({
  username,
  email,
  passwordHash,
}: {
  username: string;
  email: string;
  passwordHash: string;
}) =>
  User.create({
    username,
    email,
    passwordHash,
  });

export const getUserByUsername = (username: string) =>
  User.findAll({
    where: {
      username,
    },
  });
