import { db, eq, count, items, users, watchList } from "../db.js";

export async function getItemsAmount() {
  const itemsAmount = await db
    .select({ value: count() })
    .from(items)
    .where(eq(items.active, true));
  return itemsAmount;
}

export async function getGivenAwayAmount() {
  const givenAwayAmount = await db
    .select({ value: count() })
    .from(items)
    .where(eq(items.active, false));
  return givenAwayAmount;
}

export async function getTotalUsers() {
  const totalUsers = await db.select({ value: count() }).from(users);
  return totalUsers;
}

export async function getAllUsers() {
  const allUsrs = await db
    .select({
      id: users.id,
      username: users.name,
      email: users.email,
      phone: users.phone,
      created: users.created_at,
    })
    .from(users);
  return allUsrs;
}

export async function getWatchList() {
  try {
    const watchListItems = await db
      .selectDistinct({
        id: watchList.item_id,
        item: items.name,
        url: items.image_url,
      })
      .from(watchList)
      .innerJoin(items, eq(watchList.item_id, items.id))
      .orderBy(watchList.item_id);
    console.log("watch list admin fetch: ", watchListItems);
    return watchListItems;
  } catch (err) {
    console.error("Error from watch-list report fetch: ", err);
  }
}
