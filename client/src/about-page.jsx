import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import about_logo from "./assets/about.svg";
import { scrollToTop, ChangePageTitle } from "./functions.js";

function AboutPage(props) {
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop(), ChangePageTitle(props.title);
  }, []);

  return (
    <>
      <h1>About Us...</h1>
      <div>
        <img src={about_logo} className="logo react" alt="About Us logo" />
      </div>

      <div>
        <button type="button" onClick={() => navigate("/")}>
          Main Page
        </button>
      </div>
    </>
  );
}

export default AboutPage;
