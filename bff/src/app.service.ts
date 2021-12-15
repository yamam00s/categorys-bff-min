import { Injectable } from '@nestjs/common';

export interface Item {
  id: number;
  title: string;
  body: string;
  deletePassword: string;
}

export type PublicItem = Omit<Item, 'deletePassword'>;

const items: Item[] = [
  {
    id: 1,
    title: 'Item Title',
    body: 'Hello, world',
    deletePassword: '1234',
  },
];

@Injectable()
export class AppService {
  private getAllItem(): Item[] {
    return [...items];
  }

  getPublicItems(): PublicItem[] {
    return this.getAllItem().map((item) => {
      const publicItem = { ...item };
      delete publicItem.deletePassword;
      return publicItem;
    });
  }
}
