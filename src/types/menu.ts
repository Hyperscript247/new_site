export type Submenu = {
  id: number;
  path: string;
  title: string;
  newTab: boolean;
};

export type Menu = {
  id: number;
  path: string;
  title: string;
  newTab: boolean;
  submenu?: Submenu[]; // Optional submenu
};

// Ensure at least one export to be recognized as a module
export {};
