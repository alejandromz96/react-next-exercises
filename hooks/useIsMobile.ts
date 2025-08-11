import { useEffect, useMemo, useState } from "react";
import useWindowSize from "./useWindowSize";

const MAX_WIDTH = 768;

const useIsMobile = () => {
  const { width } = useWindowSize();

  return width < MAX_WIDTH;
};

export default useIsMobile;
