import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dashboard from "./assets/dashboard.svg";
import { scrollToTop, ChangePageTitle } from "./functions.js";

export function Categories({ title }) {
  useEffect(() => {
    scrollToTop(), ChangePageTitle(title);
  }, []);

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [resultMsg, setResultMsg] = useState("");
  const [showMsg, setShowmsg] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [fetchResult, setFetchResult] = useState("");
  console.log(category);
  console.log(description);

  async function seeClickHandler() {
    try {
      const response = await fetch("http://localhost:4000/categories", {
        method: "Get",

        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      console.log(result);
      setCategoryList(result);
      setShowList(true);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async function addClickHandler() {
    if (category === "" || description === "") {
      setResultMsg("Please fill in the fields above!");
      setShowmsg(true);
      setTimeout(() => setShowmsg(false), 5000);
      return;
    }

    setCategory("");
    setDescription("");

    try {
      const response = await fetch("http://localhost:4000/categories", {
        method: "POST",

        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({ name: category, description: description }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      console.log(result);

      setResultMsg(`Category "${category.toUpperCase()}" added successfully!`);
      setShowmsg(true);
      setTimeout(() => setShowmsg(false), 5000);
    } catch (error) {
      console.error("Error: ", error);

      setResultMsg(
        "Sorry, we were unable to add your new Category. Please try again!"
      );

      setShowmsg(true);
      setTimeout(() => setShowmsg(false), 5000);
    }
  }

  return (
    <>
      <section>
        <img
          src={dashboard}
          className="logo react"
          alt="Admin Dashboard logo"
        />
      </section>
      <section>
        <h1>See All Categories</h1>

        {showList ? (
          <>
            {categoryList.map((value, index) => (
              <div key={index} className="single-category">
                <h3>~ {index + 1} ~</h3>
                <h3>
                  <i>Category:</i>
                </h3>
                <h4>{value.name}</h4>
                <h3>
                  <i>Description:</i>
                </h3>
                <h4>{value.description}</h4>
              </div>
            ))}
            <div>
              <button type="button" onClick={() => setShowList(false)}>
                Hide
              </button>
            </div>
          </>
        ) : (
          <button type="button" onClick={seeClickHandler}>
            Load
          </button>
        )}
      </section>
      <section>
        <h1>Add Category</h1>
        <div>
          <label htmlFor="categoryName">Category:</label> <br />
          <input
            type="text"
            name="categoryName"
            id="categoryName"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setShowmsg(false);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="categoryDescription">Description:</label> <br />
          <input
            type="text"
            name="categoryDescription"
            id="categoryDescription"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              setShowmsg(false);
            }}
          ></input>
        </div>
        <div>
          <button type="submit" onClick={addClickHandler}>
            Submit
          </button>
        </div>
        {showMsg ? <h2>{resultMsg}</h2> : ""}
      </section>

      <section>
        <Link to={"/"}>
          <button type="button">Main Page</button>
        </Link>
      </section>
    </>
  );
}
