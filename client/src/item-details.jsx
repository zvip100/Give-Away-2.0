import logo from "./assets/logo.svg";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import Item from "./item.jsx";
import { allItems } from "./all-items.jsx";

export default function ItemDetails({ title, setDetailedItem }) {
  function ChangePageTitle() {
    document.title = title;
  }

  useEffect(() => ChangePageTitle, []);

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

  setDetailedItem(itemData);

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
                  },
                })
              }
            >
              Get Item
            </button>
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
    </>
  );
}
