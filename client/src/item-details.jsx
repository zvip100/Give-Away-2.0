import logo from "./assets/logo.svg";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import Item from "./item.jsx";
import { allItems } from "./all-items.jsx";
import { AuthContext } from "./App.jsx";
import Footer from "./footer.jsx";

export default function ItemDetails({ title, setDetailedItem }) {
  function ChangePageTitle() {
    document.title = title;
  }

  useEffect(() => ChangePageTitle, []);

  const currentUser = useContext(AuthContext);
  console.log("from Auth context: ", currentUser);

  const [showRemoveBtn, setShowRemoveBtn] = useState(false);
  const [isInWatchList, setIsInWatchList] = useState(false);

  const returnBtn = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const index = params.id - 1;
  const itemData = location.state;
  console.log("item data: ", itemData);
  //const itemName = itemData.name
  const hasLoaded = itemData.hasLoaded;
  console.log("hasLoaded:", hasLoaded);

  useEffect(() => {
    if (itemData?.showBtn === true) {
      setShowRemoveBtn(true);
      setIsInWatchList(true);
    }
  }, []);

  setDetailedItem(itemData);

  async function handleRemoveBtn() {
    try {
      const response = await fetch(
        "http://localhost:4000/items/watch-list/remove-item",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            itemId: itemData.itemId,
            userId: currentUser,
          }),
        }
      );

      const result = await response.json();
      console.log("remove from watch-list fetch result: ", result);
      alert("Item was successfully removed from your Watch-List!");
      setShowRemoveBtn(false);
    } catch (error) {
      console.error("Error removing watch-list", error.message);
    }
  }

  return (
    <>
      <Link to={"/about-us"}>
        <img src={logo} className="logo react" alt="Give Away logo" />
      </Link>

      {hasLoaded ? (
        <section>
          <h2>{itemData.name}</h2>

          <section>
            <Item
              key={itemData.itemId}
              img={itemData.img}
              condition={itemData.condition}
            />

            <h3>Description:</h3>
            <p>{itemData.description}</p>
          </section>

          <section>
            <button
              type="button"
              onClick={() =>
                navigate("/my-cart", {
                  state: {
                    item_id: itemData.itemId,
                    name: itemData.name,
                    url: itemData.img,
                    condition: itemData.condition,
                    watchList: isInWatchList,
                  },
                })
              }
            >
              Get Item
            </button>{" "}
            {""}
            {showRemoveBtn ? (
              <>
                <button type="button" onClick={handleRemoveBtn}>
                  Remove from Watch-List
                </button>
              </>
            ) : (
              ""
            )}
          </section>
        </section>
      ) : (
        <section>
          <h2>{allItems[index].name}</h2>

          <section>
            <Item
              key={allItems[index].id}
              img={allItems[index].url}
              condition={allItems[index].condition}
            />

            <h3>Description:</h3>
            <p>{allItems[index].description}</p>
          </section>
          <section>
            <button
              type="button"
              onClick={() =>
                navigate("/my-cart", {
                  state: {
                    item_id: allItems[index].id,
                    name: allItems[index].name,
                    url: allItems[index].url,
                    condition: allItems[index].condition,
                  },
                })
              }
            >
              Get Item
            </button>
          </section>
        </section>
      )}

      <section ref={returnBtn}>
        <button
          type="button"
          onClick={() => navigate("/", { state: itemData.userId })}
        >
          Return To Main Page
        </button>
      </section>

      <section>
        <Footer />
      </section>
    </>
  );
}
