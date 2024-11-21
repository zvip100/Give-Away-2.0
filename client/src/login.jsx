import login_logo from "./assets/login.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ItemContext } from "./App";
import Footer from "./footer.jsx";

export function Login({ title, setUser }) {
  function ChangePageTitle() {
    document.title = title;
  }

  useEffect(() => ChangePageTitle, []);

  const currentItem = useContext(ItemContext);
  console.log("from login page: ", currentItem);

  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const state = location?.state;
  console.log("login page: ", state);

  function redirectRoute(state, userId, userName, isAdmin) {
    if (state === "return to add-item page") {
      navigate("../add-item-formik", { state: "logged-in" });
    } else if (state?.showDetailsPage === true) {
      navigate(`../item-details/${currentItem.itemId}`, {
        state: currentItem,
      });
    } else if (state === "admin") {
      navigate("../admin", { state: { admin: isAdmin } });
    } else if (state === "my-account") {
      navigate("../my-account");
    } else {
      navigate("/", {
        state: { userId: userId, userName: userName, admin: isAdmin },
      });
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    /*const email = event.target.username.value;
    const password = event.target.password.value;*/
    console.log(email, password);

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        //credentials: "include",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      console.log(result);
      const userId = result.id;
      const userName = result.username;
      const isAdmin = result.isAdmin;

      setUser(userId);

      if (state === "return to add-item page") {
        setMsg("Login Successful! Redirecting To The Add-Item Page!");
      } else {
        setMsg("Login Successful! Redirecting To The Home Page!");
      }

      setShowMsg(true);
      setShowButton(false);

      redirectRoute(state, userId, userName, isAdmin);
    } catch (error) {
      console.error("Error: ", error);
      setMsg("Login Failed! Please Try Again!");
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 3000);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <section>
        <h1>THE LOGIN PAGE!</h1>
        <img src={login_logo} className="logo react" alt="Login logo" />
      </section>

      {showMsg ? (
        <h2>{msg}</h2>
      ) : (
        <>
          <section>
            <h3>Please fill out the fields below to log-in to Give-Away:</h3>
          </section>

          <form className="login-form" onSubmit={submitHandler}>
            <section className={"login-form__username"}>
              <label htmlFor="username">Email</label>
              <br />
              <input
                id="username"
                name="username"
                type="text"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </section>
            <section className="login-form__password">
              <label htmlFor="password">Password</label>
              <br />
              <input
                id="password"
                name="password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
            </section>
            <section className="login-form__actions">
              <button type="submit">Log in</button>
            </section>
          </form>
          <h3>You don't have an Account?</h3>
          <button type="button" onClick={() => navigate("/sign-up")}>
            Sign Up
          </button>
        </>
      )}

      {showButton ? (
        <section>
          <button type="button" onClick={() => navigate("/")}>
            Return To Main Page
          </button>
        </section>
      ) : (
        ""
      )}

      <section>
        <Footer />
      </section>
    </>
  );
}
