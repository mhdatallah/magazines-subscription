export interface Magazine {
  id: number;
  title: string;
  description: string;
  price: string;
  publicationDate: string;
  isDeleted: false;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  isActive: boolean;
  id: number;
  UserId: number;
  MagazineId: number;
  startDate: string;
  endDate?: string;
  updatedAt: string;
  createdAt: string;
}
