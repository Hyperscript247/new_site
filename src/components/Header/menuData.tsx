import { Menu } from "../../types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "About Us",
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "Services",
    path: "/services",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Data Management & Analytics",
        path: "/services/data-analytics",
        newTab: false,
      },
      {
        id: 32,
        title: "Software Engineering",
        path: "/services/software-engineering",
        newTab: false,
      },
      {
        id: 33,
        title: "Training & Capacity Building",
        path: "/services/training",
        newTab: false,
      },
      {
        id: 34,
        title: "Talent Outsourcing",
        path: "/services/talent-outsourcing",
        newTab: false,
      },
    ],
  },
  {
    id: 4,
    title: "Success Stories",
    path: "/success-stories",
    newTab: false,
  },
  {
    id: 5,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
];

export default menuData;
