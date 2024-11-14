import { useState } from "react";
import Item from "./item.jsx";

function FilterItems({ allItems }) {
  const [items, setItems] = useState(allItems);
  const [category, SetCategory] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [showFilter, setShowFilter] = useState(true);

  function getCategoryName(number) {
    let categoryName;

    switch (number) {
      case "2":
        categoryName = "Electronics";
        break;
      case "3":
        categoryName = "Clothing";
        break;
      case "4":
        categoryName = "Watches";
        break;
      case "5":
        categoryName = "Bikes";
        break;
      case "7":
        categoryName = "Shoes";
        break;
      case "8":
        categoryName = "Toys & Games";
        break;
      case "9":
        categoryName = "Houseware";
        break;
      case "10":
        categoryName = "Outdoors";
        break;
      default:
        categoryName = "Any Category";
    }

    return categoryName;
  }

  function handleChange(event) {
    const selectedValue = event.target.value;
    SetCategory(selectedValue);
    setCategoryName(getCategoryName(selectedValue));
    setShowFilter(false);
  }
  return (
    <>
      {showFilter ? (
        <>
          <h2>Filter By Category:</h2>

          <div>
            <select name="filter" id="filter" onChange={handleChange}>
              <option value="1">All Items</option>
              <option value="2">Electronics</option>
              <option value="3">Clothing</option>
              <option value="4">Watches</option>
              <option value="5">Bikes</option>
              <option value="7">Shoes</option>
              <option value="8">Toys & Games</option>
              <option value="9">Houseware</option>
              <option value="10">Outdoors</option>
            </select> 
          </div>
        </>
      ) : (
        <>
          <h3>* Showing items of category: "{categoryName}" *</h3>

          <section>
            <button type="button" onClick={() => setShowFilter(true)}>
              Reset Filter
            </button>
          </section>

          {items
            .filter((item) => item.categoryId == category)
            .map((item) => (
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

          <div>
            <p>================</p>
            <h2>All Items:</h2>
            <p>================</p>
          </div>
        </>
      )}
    </>
  );
}

export default FilterItems;
