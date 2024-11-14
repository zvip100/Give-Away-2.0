import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "./App.jsx";

function MyAccount(props) {
  const currentUser = useContext(AuthContext);
  console.log("from Auth context: ", currentUser);

  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state;

  function ChangePageTitle() {
    document.title = props.title;
  }
  useEffect(() => ChangePageTitle, []);

  async function GetWatchList() {
    console.log("Hello!");
    /*const response = await fetch()*/
  }

  return (
    <>
      <h3>Hello {username}!</h3>

      <div>
        <h1>NO DATA YET...</h1>
      </div>

      <div>
        <button type="button" onClick={GetWatchList}>
          My Watch-list
        </button>
      </div>

      <section>
        <button type="button" onClick={() => navigate("/")}>
          Main page
        </button>
      </section>
    </>
  );
}

export default MyAccount;
