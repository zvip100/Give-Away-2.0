import { db, eq, count, items, users } from "../db.js";

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
