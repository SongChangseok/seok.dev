import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

function Router() {
  const element = useRoutes(routes);
  return element;
}

export default Router;
