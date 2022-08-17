import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();
  let state = location.state as {
    modalLocation?: Location;
  };

  useEffect(() => {
    if (!state?.modalLocation) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
}
