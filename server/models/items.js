import { and } from "drizzle-orm";
import {
  eq,
  db,
  items,
  categories,
  conditions,
  users,
  watchList,
} from "../db.js";

export async function createItem(itemData) {
  const {
    name,
    description,
    longDescription,
    urlFileName,
    expiryDate,
    categoryId,
    conditionId,
    userId,
  } = itemData;
  const values = {
    name,
    description,
    long_description: longDescription,
    image_url: urlFileName,
    category_id: categoryId,
    condition_id: conditionId,
    user_id: userId,
  };
  console.log(values);
  const item = await db
    .insert(items)
    .values(itemData)
    .returning({ id: users.id });
  console.log(item);
  return item;
}

export async function findAllItems() {
  const countResult = await db
    .select()
    .from(items)
    .where(eq(items.active, true)); // Adjust based on your library
  const count = countResult.length; // Assuming it returns an array

  if (count === 0) {
    return []; // Return an empty array if no records exist
  }

  const itemList = await db
    .select({
      id: items.id,
      name: items.name,
      url: items.image_url,
      condition: conditions.name,
      description: items.description,
      categoryId: items.category_id,
    })
    .from(items)
    .where(eq(items.active, true))
    .leftJoin(categories, eq(items.category_id, categories.id))
    .leftJoin(conditions, eq(items.condition_id, conditions.id))
    .leftJoin(users, eq(items.user_id, users.id));
  return itemList;
}
export const findItemById = async (itemId) => {
  console.error(itemId);
  try {
    const item = await db
      .select()
      .from(items)
      .where(eq(items.id, itemId)) // Using SQL template
      .execute();
    return item.length > 0 ? item[0] : null;
  } catch (error) {
    console.error("Error retrieving item:", error);
    throw new Error("Database query failed: " + error);
  }
};

// Function to update an item status
export const updateItemStatus = async (itemId, user) => {
  try {
    const userNum = user;
    console.log(userNum);
    const updatedItem = await db
      .update(items)
      .set({ active: false, received_by: userNum })
      .where(eq(items.id, itemId))
      .execute();
    return updatedItem;
  } catch (error) {
    console.error("Error updating item status:", error);
    throw new Error("Database update failed");
  }
};
// Function to update an item with an image URL
export const updateItemImage = async (itemId, imageUrl) => {
  try {
    const updatedItem = await db
      .update(items)
      .set({ imageUrl })
      .where(items.id.eq(itemId))
      .execute();
    return updatedItem;
  } catch (error) {
    console.error("Error updating item image: ", error);
    throw new Error("Database update failed");
  }
};

export const addToWatchList = async (itemId, userId) => {
  try {
    let isAdded;
    const checkItem = await db
      .select()
      .from(watchList)
      .where(and(eq(watchList.item_id, itemId), eq(watchList.user_id, userId)));
    console.log("watchList: ", checkItem);
    if (checkItem.length > 0) {
      isAdded = true;
      return isAdded;
    }

    const item = await db
      .insert(watchList)
      .values({ item_id: itemId, user_id: userId })
      .returning();
    console.log(item);
    return item;
  } catch (error) {
    console.error("Error adding to watch list: ", error);
  }
};
