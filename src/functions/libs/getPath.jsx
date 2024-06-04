import { useLocation } from "react-router-dom";

export function getPath() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const lastPart = pathParts[pathParts.length - 1];
  return lastPart;
}
