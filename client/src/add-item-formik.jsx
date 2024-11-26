import logo from "./assets/logo.svg";
import blocked_logo from "./assets/blocked.svg";
import { allItems, singleItem } from "./all-items.jsx";
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { itemSchema } from "./item-schema.js";
import { AuthContext } from "./App.jsx";
import { scrollToTop, ChangePageTitle } from "./functions.js";

export default function AddItemFormik(props) {
  const currentUser = useContext(AuthContext);
  console.log("from Auth context: ", currentUser);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [itemName, setItemName] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [condition, setCondition] = useState("Unknown");
  const [description, setDescription] = useState("");
  const [askToLogin, setAskToLogin] = useState(false);
  const pageMsg = useRef(null);
  const formSection = useRef(null);
  let descriptionRef = useRef(null);
  const itemAddedSection = useRef(null);
  const itemAddedMsg = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const newSingleItem = singleItem;

  function checkIfLoggedIn() {
    if (currentUser === null || currentUser === undefined) {
      setAskToLogin(true);
      /*setTimeout(
        () => navigate("/auth/login", { state: "return to add-item page" }),
        3000
      );*/
    }
  }

  useEffect(() => {
    scrollToTop(), ChangePageTitle(props.title), checkIfLoggedIn();
  }, []);

  const formik = useFormik({
    initialValues: {
      itemName: "",
      itemLink: "",
      condition: "",
      description: "",
    },
    validationSchema: itemSchema,
    onSubmit: submitHandler,
  });

  function formatConditions(condition) {
    let conditionNum;
    switch (condition) {
      case "New":
        conditionNum = 1;
        break;
      case "Open Box":
        conditionNum = 2;
        break;
      case "Refurbished":
        conditionNum = 3;
        break;
      case "Used":
        conditionNum = 4;
        break;
      case "Damaged":
        conditionNum = 5;
        break;
      default:
        conditionNum = "Unknown";
    }
    return conditionNum;
  }

  async function postNewItem(newSingleItem) {
    console.log(newSingleItem);
    try {
      const response = await fetch("http://localhost:4000/items", {
        method: "POST",

        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({
          name: newSingleItem.name,
          description: newSingleItem.description,
          image_url: newSingleItem.url,
          category_id: 1,
          condition_id: newSingleItem.condition_id,
          user_id: currentUser,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error :", error);
    }
  }

  function submitHandler(values, { resetForm }) {
    /*event.preventDefault();
    setItemName(formik.values.itemName);
    setItemUrl(formik.values.itemLink);
    setCondition(formik.values.condition);
    setDescription(formik.values.description);
  */

    newSingleItem.id = allItems.length + 1;
    newSingleItem.name = formik.values.itemName;
    newSingleItem.url = formik.values.itemLink;
    newSingleItem.condition = formik.values.condition;
    newSingleItem.condition_id = formatConditions(formik.values.condition);
    newSingleItem.description = formik.values.description;

    allItems.push(newSingleItem);
    console.log(newSingleItem);
    console.log(allItems);

    pageMsg.current.style.display = "none";
    formSection.current.style.display = "none";
    itemAddedSection.current.style.display = "block";
    itemAddedMsg.current.style.display = "block";
    console.log(description);

    resetForm();
    postNewItem(newSingleItem);
  }

  function handleAddBtn() {
    setItemName("");
    setItemUrl("");
    setCondition("");
    pageMsg.current.style.display = "block";
    formSection.current.style.display = "block";
    descriptionRef.current.value = "";
    itemAddedSection.current.style.display = "none";
  }

  function handleReturnBtn() {
    navigate("/");
  }

  /*function goToLogin(event) {
    setIsLoggedIn(false);
    pageMsg.current.style.display = "none";
    const hideBtn = event.target;
    hideBtn.style.display = "none";
    setTimeout(() => navigate("../auth/login"), 2000);
  }*/

  return (
    <>
      {askToLogin ? (
        <>
          <h2>You Need To Log-in In To Add A New Item!</h2>

          <section>
            <img
              src={blocked_logo}
              className="logo react"
              alt="Blocked Access logo"
            />
          </section>

          <section>
            <button
              type="button"
              onClick={() =>
                navigate("../auth/login", { state: "return to add-item page" })
              }
            >
              Login
            </button>
          </section>
        </>
      ) : (
        <>
          <section>
            <img src={logo} className="logo react" alt="Give Away logo" />
          </section>

          <h2 ref={pageMsg}>
            Please fill out the fields below to submit your new Item to
            Give-Away!
          </h2>

          <section>
            <form ref={formSection} onSubmit={formik.handleSubmit}>
              <label htmlFor="itemName">Item Name:</label>
              <br />
              <input
                type="text"
                id="itemName"
                name="itemName"
                onChange={formik.handleChange}
                value={formik.values.itemName}
                onBlur={formik.handleBlur}
              ></input>
              <p className="err-msg">
                {formik.touched.itemName ? formik.errors.itemName : ""}{" "}
              </p>
              <br />
              <label htmlFor="itemLink">URL:</label>
              <br />
              <input
                type="text"
                id="itemLink"
                name="itemLink"
                onChange={formik.handleChange}
                value={formik.values.itemLink}
                onBlur={formik.handleBlur}
              ></input>
              <p className="err-msg">
                {formik.touched.itemLink ? formik.errors.itemLink : ""}{" "}
              </p>

              <br />

              <label htmlFor="condition">Condition:</label>
              <br />
              <select
                id="condition"
                name="condition"
                onChange={formik.handleChange}
                value={formik.values.condition}
                onBlur={formik.handleBlur}
              >
                <option value="Unknown">Select One Option</option>
                <option>New</option>
                <option>Refurbished</option>
                <option>Open Box</option>
                <option>Used</option>
                <option>Damaged</option>
              </select>
              <p className="err-msg">
                {formik.touched.condition ? formik.errors.condition : ""}{" "}
              </p>
              <section>
                <label htmlFor="description">Description:</label>
                <br />
                <textarea
                  id="description"
                  name="description"
                  ref={descriptionRef}
                  value={formik.values.description}
                  rows="8"
                  cols="40"
                  placeholder="Type here your item description:"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>
                <p className="err-msg">
                  {formik.touched.description ? formik.errors.description : ""}{" "}
                </p>
              </section>
              <section>
                {" "}
                <button type="submit">Submit</button>{" "}
                <button type="reset" onClick={() => formik.resetForm()}>
                  Reset
                </button>
              </section>
            </form>

            <section ref={itemAddedSection} style={{ display: "none" }}>
              <h2 className="msg" ref={itemAddedMsg}>
                You Added A New Item Successfully!!
              </h2>
              <section>
                <figure>
                  <img
                    src={newSingleItem.url}
                    alt={newSingleItem.name}
                    width="300"
                    height="300"
                  ></img>
                  <figcaption>
                    <i>{newSingleItem.name}</i>
                  </figcaption>
                  <p>Description: {newSingleItem.description}</p>
                  <p>
                    Condition: <b>{newSingleItem.condition}</b>
                  </p>
                </figure>
              </section>
              <button type="button" onClick={handleAddBtn}>
                Add Another Item
              </button>{" "}
            </section>
          </section>
        </>
      )}
      <button type="button" onClick={handleReturnBtn}>
        Return To Main Page
      </button>
    </>
  );
}
