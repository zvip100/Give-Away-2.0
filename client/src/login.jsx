import login_logo from "./assets/login.svg";
import confirmed_logo from "./assets/user-confirmed.svg";
import login_error_logo from "./assets/login-error.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ItemContext } from "./App";
import Footer from "./footer.jsx";
import { scrollToTop, ChangePageTitle } from "./functions.js";
import sleep from "sleep-promise";

export function Login({ title, setUser }) {
  useEffect(() => {
    scrollToTop(), ChangePageTitle(title);
  }, []);

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

  //let test = false;

  function redirectRoute(state, userId, userName, isAdmin) {
    console.log("redirect function in action!");
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
    } /*else {
      navigate("/", {
        state: { userId: userId, userName: userName, admin: isAdmin },
      });
    }*/
  }

  function handleFailedLogin() {
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 4000);
    setEmail("");
    setPassword("");
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    console.log(email, password);

    if (email === "" || password === "") {
      alert("You have to fill out the fields below to Log-in!");
      setEmail("");
      setPassword("");
      scrollToTop();
      return;
    }

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

      if (
        result?.message === "User not found" ||
        result?.message === "Invalid password"
      ) {
        setMsg("Username or Password is incorrect! Please try again!");
        handleFailedLogin();
        return;
      }

      const userId = result.id;
      const userName = result.username;
      const isAdmin = result.isAdmin;

      setUser(userId);

      /*if (state === "return to add-item page") {
        setMsg("Login Successful! Redirecting To The Add-Item Page!");
      } else {
        setMsg("Login Successful! Redirecting To The Home Page!");
      }*/

      setMsg("Login Successful!");
      setShowMsg(true);
      setShowButton(false);

      if (state === null) {
        navigate("../login-success", {
          state: { userId: userId, userName: userName, isAdmin: isAdmin },
        });
      } else {
        redirectRoute(state, userId, userName, isAdmin);
      }

      //redirectRoute(state, userId, userName, isAdmin);

      /* (async () => {
        await sleep(2000);
        redirectRoute(state, userId, userName, isAdmin);
        console.log('2 seconds later …');
    })();*/

      /* setTimeout(() => {
        redirectRoute(state, userId, userName, isAdmin);
      }, 3000);*/
    } catch (error) {
      console.error("Error: ", error);
      setMsg("Login Failed! Please Try Again!");
      handleFailedLogin();
    }
  };

  /*async function Delay(id, name, admin) {
    await sleep(2000);
    //redirectRoute(state, id, name, admin);
    test = true;
    console.log("2 seconds later …");
  }*/

  return (
    <>
      {showMsg ? (
        <>
          <h2 style={{ color: "rgb(83, 102, 197)" }}>{msg}</h2>
          <section>
            <img
              src={login_error_logo}
              className="logo react"
              alt="Login Failed logo"
            />
          </section>
        </>
      ) : (
        <>
          <section>
            <h1>THE LOGIN PAGE!</h1>
            <img src={login_logo} className="logo react" alt="Login logo" />
          </section>

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
