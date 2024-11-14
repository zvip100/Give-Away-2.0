import { useState, useEffect, useRef, useContext } from "react";
import logo from "./assets/logo.svg";
import "./App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { allItems } from "./all-items.jsx";
import Item from "./item.jsx";
import MyAccount from "./my-account.jsx";
import { AuthContext } from "./App.jsx";
import FilterItems from "./filter-items.jsx";
import { SearchItem } from "./search-items.jsx";

function Homepage(props) {
  const currentUser = useContext(AuthContext);
  console.log("from Auth context: ", currentUser);

  const [askToLogin, setAskToLogin] = useState(false);
  const [welcomeMsg, setWelcomeMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [showMyAccountBtn, setShowMyAccountBtn] = useState(false);
  const [showLoginSection, setShowLoginSection] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState(location.state?.userName);
  console.log(userName);
  //when redirecting from item-details page
  //const user_id = location.state;
  //console.log(user_id);

  function ChangePageTitle() {
    document.title = props.title;
  }

  function askForLogin(time) {
    if (currentUser === null || currentUser === undefined) {
      setShowLoginSection(true);
      setTimeout(() => setAskToLogin(true), time);
    }
  }

  function displayMyAccount() {
    if (currentUser !== null && currentUser !== undefined) {
      setShowMyAccountBtn(true);
    }
  }

  function greetUser() {
    if (userName !== null && userName !== undefined) {
      const nameUpperCase = userName?.toUpperCase();
      setWelcomeMsg(`= HELLO ${nameUpperCase}! =`);
      setShowMsg(true);
    }
  }

  useEffect(() => {
    ChangePageTitle(), askForLogin(10000), greetUser(), displayMyAccount();
  }, []);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch("http://localhost:4000/items", {
          method: "GET",
        });

        const result = await response.json();
        console.log(result);

        setHasLoaded(true);
        setItems(result);
      } catch (error) {
        console.error(error.message);
      }
    };
    getItems();
  }, []);

  return (
    <>
      {showMsg ? (
        <>
          <Link to={"/my-account"} state={userName}>
            <h2 className="welcome_user_msg">
              <i>{welcomeMsg}</i>
            </h2>
          </Link>
        </>
      ) : (
        ""
      )}

      <h1>WELCOME TO "GIVE-AWAY"!!!</h1>

      <div>
        <Link to={"/about-us"}>
          <img src={logo} className="logo react" alt="Give Away logo" />
        </Link>
      </div>

      <div>
        <button type="button" onClick={() => navigate("/about-us")}>
          About Us
        </button>{" "}
        {showMyAccountBtn ? (
          <button
            type="button"
            onClick={() => navigate("/my-account", { state: userName })}
          >
            My Account
          </button>
        ) : (
          ""
        )}{" "}
        <Link to={"/add-item-formik"} className="link">
          <button type="button">Add New Item</button>
        </Link>
      </div>

      {showLoginSection ? (
        <>
          <section>
            <button type="button" onClick={() => navigate("auth/login")}>
              Login
            </button>

            <p>Don't have an account yet?</p>

            <button type="button" onClick={() => navigate("/sign-up")}>
              Create Account
            </button>
          </section>
        </>
      ) : (
        ""
      )}

      {askToLogin ? (
        <>
          <section>
            <h2>Please Log-in to enjoy the best experience! </h2>
          </section>
          <button type="button" onClick={() => setAskToLogin(false)}>
            Dismiss
          </button>{" "}
          <button
            type="button"
            onClick={() => {
              setAskToLogin(false);
              askForLogin(15000);
            }}
          >
            Remind Me Later
          </button>{" "}
        </>
      ) : (
        <>
          {hasLoaded ? (
            <section>
              <div>
                <h1>Discover Our Hot Deals!!</h1>
              </div>

              <div>
                <SearchItem _items={items} />
                <FilterItems allItems={items} />
              </div>

              {items.map((item) => (
                <div className="single-item" key={item.id}>
                  <Item
                    key={item.id}
                    itemId={item.id}
                    name={item.name}
                    img={item.url}
                    condition={item.condition}
                    description={item.description}
                    hasLoaded={true}
                  ></Item>{" "}
                </div>
              ))}
            </section>
          ) : (
            <div>
              <div>
                <h1>(from client-side)</h1>
              </div>

              <section>
                <h2>Discover Our Hot Deals!!</h2>

                {allItems.map((item) => (
                  <Item
                    key={item.id}
                    itemId={item.id}
                    name={item.name}
                    img={item.url}
                    condition={item.condition}
                    hasLoaded={false}
                  ></Item>
                ))}
              </section>
            </div>
          )}

          <section>
            <Link to={"/add-item-formik"} className="link">
              <button type="button">Add New Item</button>
            </Link>{" "}
            <button type="button" onClick={() => console.log("Disabled")}>
              Logout
            </button>
          </section>
          <a href="#top">Return to top of the page</a>
        </>
      )}
    </>
  );
}

export default Homepage;
