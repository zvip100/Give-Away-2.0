import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./App";
import dashboard from "./assets/dashboard.svg";
import blocked_logo from "./assets/blocked.svg";
import { WatchListReport } from "./watch-list-report";
import Footer from "./footer.jsx";

export function AdminPage({ title }) {
  function ChangePageTitle() {
    document.title = title;
  }

  useEffect(() => {
    ChangePageTitle(), checkIfLoggedIn(), checkIfAdmin();
  }, []);

  const currentUser = useContext(AuthContext);
  console.log("from Auth context: ", currentUser);

  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownValue, setDrpodownValue] = useState("");
  const [showReport, setShowReport] = useState("");
  const [itemAmount, setItemAmount] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [about, setAbout] = useState("");
  const [users, setUsers] = useState("");
  const [showUsersReport, setShowUsersReport] = useState(false);
  const [showWLReport, setShowWLReport] = useState(false);

  function checkIfLoggedIn() {
    if (currentUser !== null && currentUser !== undefined) {
      setLoggedIn(true);
    }
  }

  function checkIfAdmin() {
    if (location?.state?.admin === false) {
      alert("You don't have Admin access!");
      setLoggedIn(false);
    }
  }

  async function getItemAmountReport() {
    try {
      const response = await fetch(
        "http://localhost:4000/admin/reports/item-amount",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();
      console.log(result);
      setItemAmount(result);
      setShowBtn(true);
      setAbout("available items");
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getGivenAwayReport() {
    try {
      const response = await fetch(
        "http://localhost:4000/admin/reports/given-away-amount",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();
      console.log(result);
      setItemAmount(result);
      setShowBtn(true);
      setAbout("Given-away items");
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getUserTotalReport() {
    try {
      const response = await fetch(
        "http://localhost:4000/admin/reports/total-users",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();
      console.log(result);
      setItemAmount(result);
      setShowBtn(true);
      setAbout("registered users");
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getAllUsersReport() {
    try {
      const response = await fetch(
        "http://localhost:4000/admin/reports/all-users",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();
      console.log(result);
      setUsers(result);
      //setShowBtn(true);
      setShowUsersReport(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function GetWatchListReport() {
    try {
      const response = await fetch(
        "http://localhost:4000/admin/reports/watch-list",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();
      console.log(result);
      setItemAmount(result);
      //setShowBtn(true);
      //setAbout("watch-list");
      setShowWLReport(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  function handleChange(event) {
    const selectedOption = event.target.value;
    setDrpodownValue(selectedOption);
    console.log(dropdownValue);
    setShowBtn(false);
    setShowReport(false);
    setShowUsersReport(false);
    setShowWLReport(false);

    if (selectedOption === "See total amount of items on site") {
      getItemAmountReport();
    } else if (selectedOption === "See total amount of items given away") {
      getGivenAwayReport();
    } else if (selectedOption === "See total amount of users") {
      getUserTotalReport();
    } else if (selectedOption === "See all users") {
      getAllUsersReport();
    } else if (selectedOption === "See all items added to watch list") {
      GetWatchListReport();
    }
  }

  function handleClick() {
    setShowReport(true);
    console.log("item-amount", itemAmount);
  }

  return (
    <>
      <div>
        <h1>Give-Away Admin Dashboard!</h1>
      </div>

      {loggedIn ? (
        <>
          <section>
            <img
              src={dashboard}
              className="logo react"
              alt="Admin Dashboard logo"
            />
          </section>

          <section>
            <button type="button" onClick={() => navigate("./categories")}>
              All Item Categories
            </button>
          </section>

          <h2>Admin Reports:</h2>

          <select
            name="admin-dropdown"
            id="admin-dropdown"
            onChange={handleChange}
          >
            <option>Select one option</option>
            <option disabled>See item uploads by user</option>
            <option disabled>see all items uploaded today</option>
            <option disabled>See all items given away today</option>
            <option>See all items added to watch list</option>
            <option>See total amount of items on site</option>
            <option>See total amount of items given away</option>
            <option>See all users</option>
            <option>See total amount of users</option>
          </select>

          {showBtn ? (
            <div>
              <button type="button" onClick={handleClick}>
                See Report
              </button>
            </div>
          ) : (
            ""
          )}

          {showReport ? (
            <h2>
              Total amount of {about}: {itemAmount[0]?.value}
            </h2>
          ) : (
            ""
          )}

          {showUsersReport ? (
            <>
              <h1>All Users:</h1>
              {users.map((user, index) => (
                <div key={index} className="single-user">
                  <h2 style={{ fontStyle: "italic" }}>~ User {index + 1} ~</h2>
                  <p>=====</p>
                  <h3>Id:</h3>
                  <p>{user.id}</p>
                  <h3>Username:</h3>
                  <p>{user.username}</p>
                  <h3>Email Address:</h3>
                  <p>{user.email}</p>
                  <h3>Phone Number:</h3>
                  <p>{user.phone}</p>
                  <h3>Account Created:</h3>
                  <p>{user.created}</p>
                </div>
              ))}
            </>
          ) : (
            ""
          )}
          {showWLReport ? (
            <>
              <h1>Watch List Report:</h1>
              {itemAmount.map((item) => (
                <WatchListReport
                  key={item.id}
                  id={item.id}
                  item={item.item}
                  url={item.url}
                />
              ))}
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <section>
            <img
              src={blocked_logo}
              className="logo react"
              alt="Blocked Access logo"
            />
          </section>

          <button
            type="button"
            onClick={() => navigate("/auth/login", { state: "admin" })}
          >
            Log-in
          </button>
        </>
      )}

      <section>
        <Footer />
      </section>
    </>
  );
}
