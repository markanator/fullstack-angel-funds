// source: https://stackoverflow.com/posts/56818036/revisions
import { useRef } from "react";

export const useComponentWillMount = (func) => {
  const willMount = useRef(true);

  if (willMount.current) func();

  willMount.current = false;
};
