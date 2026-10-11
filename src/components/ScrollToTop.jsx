// When the route changes, jump back to the top of the new page.
// (Without this, going from the bottom of one page to another
// would leave you scrolled down.)
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
