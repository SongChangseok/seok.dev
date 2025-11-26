import { RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import Budget from "@/pages/Budget";
import AIChatbot from "@/pages/AIChatbot";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/budget",
    element: <Budget />,
  },
  {
    path: "/ai-chatbot",
    element: <AIChatbot />,
  },
];
