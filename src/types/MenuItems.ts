interface itemInterface {
  name: string;
  type: string;
}

export type itemType = Record<string, itemInterface[]>;
