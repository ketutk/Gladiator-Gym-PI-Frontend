import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

export const getQueryParams = (query) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const result = searchParams.get(query);
  return result;
};
