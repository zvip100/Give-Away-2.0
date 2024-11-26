import { useRouteError } from "react-router-dom";
import { useEffect } from "react";
import error_logo from "./assets/error.svg";
import { scrollToTop, ChangePageTitle } from "./functions.js";

export default function ErrorPage(props) {
  useEffect(() => {
    scrollToTop(), ChangePageTitle(props.title);
  }, []);

  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div>
        <img src={error_logo} className="logo react" alt="Error page logo" />
      </div>

      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
