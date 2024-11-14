import { useState } from "react";
import Item from "./item";

export function SearchItem({ _items }) {
  const [items, setItems] = useState(_items);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResult, setShowResult] = useState(false);

  function searchHandler(event) {
    setSearchTerm(event.target.value);
    setShowResult(true);
  }

  function handleClick() {
    setSearchTerm("");
  }

  return (
    <>
      <h2>Search For Any Item:</h2>

      <input
        type="text"
        name="item-search-bar"
        id=" item-search-bar"
        placeholder="Search for item..."
        value={searchTerm}
        onChange={searchHandler}
        style={{marginBottom: "3%"}}
      ></input>

      <div>
        <button type="button" onClick={handleClick}>
          Clear
        </button>
      </div>

      {showResult ? (
        <>
          {items
            .filter((item) =>
              item.name.toLowerCase().split(" ").includes(searchTerm)
            )
            .map((item) => (
              <>
                <div key={item.condition}>
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
              </>
            ))}
        </>
      ) : (
        ""
      )}
    </>
  );
}
