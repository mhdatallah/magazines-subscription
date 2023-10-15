import { Magazine } from "../models";

export const createMagazine = ({
  title,
  description,
  price,
  publicationDate,
}: {
  title: string;
  description: string;
  price: number;
  publicationDate: Date;
}) =>
  Magazine.create({
    title,
    description,
    price,
    publicationDate,
  });

export const listMagazines = () => Magazine.findAll();
