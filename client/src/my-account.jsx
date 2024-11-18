import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "./App.jsx";
import Item from "./item.jsx";

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

  const [watchList, setWatchList] = useState([]);
  const [showWatchList, setShowWatchList] = useState(false);

  async function GetWatchList() {
    try {
      const response = await fetch(
        `http://localhost:4000/items/watch_list/${currentUser}`,
        {
          method: "Get",

          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      console.log("fetch result: ", result);

      const filteredResult = result.map((item) => {
        const list = {
          id: item.items_new.id,
          name: item.items_new.name,
          description: item.items_new.description,
          condition: item.conditions_new.name,
          category_id: item.items_new.category_id,
          image_url: item.items_new.image_url,
        };
        return list;
      });
      console.log("filtered result: ", filteredResult);

      setWatchList(filteredResult);
      console.log("watch list: ", watchList);
      setShowWatchList(true);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <>
      <section>
        <h3>Hello {username}!</h3>
      </section>

      {showWatchList ? (
        <div>
          <h1>Your Watch List:</h1>
          {watchList.map((item, index) => (
            <div className="single-item" key={index}>
              <Item
                key={item.id}
                itemId={item.id}
                name={item.name}
                img={item.image_url}
                condition={item.condition}
                description={item.description}
                hasLoaded={true}
              ></Item>{" "}
            </div>
          ))}
          <div>
            <button type="button" onClick={() => setShowWatchList(false)}>
              Dismiss
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button type="button" onClick={GetWatchList}>
            My Watch-list
          </button>
        </div>
      )}

      <section>
        <button type="button" onClick={() => navigate("/")}>
          Main page
        </button>
      </section>
    </>
  );
}

export default MyAccount;
