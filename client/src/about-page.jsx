import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AboutPage(props) {
  function ChangePageTitle() {
    document.title = props.title;
  }

  const navigate = useNavigate();

  useEffect(() => ChangePageTitle, []);

  return (
    <>
      <h1>About Us...</h1>
      <div>
        <button type="button" onClick={() => navigate("/")}>
          Main Page
        </button>
      </div>
    </>
  );
}

export default AboutPage;
