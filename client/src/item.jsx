import { Link } from "react-router-dom";
import { useState } from "react";

export default function Item({
  itemId,
  name,
  img,
  condition,
  description,
  hasLoaded,
  userId
}) {
  const itemData = {
    itemId,
    name,
    img,
    condition,
    description,
    hasLoaded,
    userId
  };
  const idType = typeof itemId;

  const itemElement = (
    <figure>
      <img src={img} alt={name} width="300" height="300"></img>
      <figcaption>{name}</figcaption>
    </figure>
  );

  return (
    <div className="single-item">
      {idType === "number" ? (
        <Link to={`/item-details/${itemId}`} state={itemData}>
          {itemElement}
        </Link>
      ) : (
        itemElement
      )}

      <p>
        Condition: <b>{condition}</b>
      </p>
    </div>
  );
}
