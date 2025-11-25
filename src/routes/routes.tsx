import { RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import Budget from "@/pages/Budget";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/budget",
    element: <Budget />,
  },
];
