import logo from "./assets/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext, ItemContext } from "./App";
import { scrollToTop, ChangePageTitle } from "./functions.js";

export default function MyCart(props) {
  useEffect(() => {
    scrollToTop(), ChangePageTitle(props.title), checkIfLoggedIn();
  }, []);

  const currentUser = useContext(AuthContext);
  console.log("from Auth context: ", currentUser);

  const currentItem = useContext(ItemContext);
  console.log(currentItem);

  const navigate = useNavigate();
  const location = useLocation();
  const alreadyInWatchList = location?.state?.watchList;
  console.log("already in watch-list: ", alreadyInWatchList);

  const [askToLogin, setAskToLogin] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [watchingItem, setWatchingItem] = useState(false);
  const [buttonMsg, setButtonMsg] = useState("Return To Main Page");

  function checkIfLoggedIn() {
    if (currentUser === null || currentUser === undefined) {
      setAskToLogin(true);
    }
  }

  const selectedItem = {
    //id: location.state.item_id,
    //name: location.state.name,
    id: currentItem.itemId,
    name: currentItem.name,
    url: currentItem.img,
    //url: location.state.url,
    //condition: location.state.condition,
  };

  async function confirmItem() {
    try {
      const response = await fetch(
        `http://localhost:4000/items/get-item/${currentItem.itemId}`,
        {
          method: "POST",

          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify({ currentUser }),
        }
      );

      const result = await response.json();
      console.log(result);

      setConfirmed(true);
      setButtonMsg("Continue Shopping");
    } catch (error) {
      console.error("Error from my-cart page: ", error);
      alert("Action failed! \nPlease try again.");
    }
  }

  async function confirmWatchList() {
    try {
      const response = await fetch(
        `http://localhost:4000/items/watch_list/${currentItem.itemId}`,
        {
          method: "POST",

          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify({ currentUser }),
        }
      );

      const result = await response.json();
      console.log(result);

      if (result == "already added") {
        alert("Item already on your watch list!");
        return;
      }

      setWatchingItem(true);
      setButtonMsg("Continue Shopping");
    } catch (error) {
      console.error("Error from my-cart page: ", error);
      alert("Action failed! \nPlease try again.");
    }
  }

  function handleConfirmBtn() {
    const confirmedOrder = selectedItem;
    confirmItem();
  }

  function handleWatchListBtn() {
    const addToWatchList = selectedItem;
    confirmWatchList();
  }
  return (
    <>
      <img src={logo} className="logo react" alt="Give Away logo" />

      {askToLogin ? (
        <>
          {" "}
          <h2>You need to login to get the Item!</h2>{" "}
          <section>
            <button
              type="button"
              onClick={() =>
                navigate("../auth/login", {
                  state: { showDetailsPage: true },
                })
              }
            >
              Login
            </button>
          </section>
        </>
      ) : (
        <>
          {confirmed ? (
            <>
              <h1>Order Confirmed Successfully!</h1>
              <h3>Please check your Email inbox for details.</h3>
            </>
          ) : watchingItem ? (
            <h1>Item Added Successfully To Your Watch List!</h1>
          ) : (
            <>
              <h1>Please confirm your order:</h1>
              <h2>{selectedItem.name}</h2>
              <img
                src={selectedItem.url}
                alt={selectedItem.name}
                width="300"
                height="300"
              ></img>
              <section>
                <button type="button" onClick={handleConfirmBtn}>
                  Confirm
                </button>{" "}
                {alreadyInWatchList ? (
                  ""
                ) : (
                  <button type="button" onClick={handleWatchListBtn}>
                    Add To Watch List
                  </button>
                )}
              </section>
            </>
          )}
        </>
      )}

      <section>
        <button type="button" onClick={() => navigate("/")}>
          {buttonMsg}
        </button>
      </section>
    </>
  );
}
