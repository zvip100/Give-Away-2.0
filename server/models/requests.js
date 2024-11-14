import { db, requests, users, items } from '../db.js';

export async function createRequest(requestData,user) {
  const { userId, itemId, message, status } = requestData;
  const request = await db.insert(requests).values({
    user_id: userId,
    item_id: itemId,
    message,
    status
  }).returning();
  return request;
}

export async function findAllRequests() {
  const requestList = await db.select().from(requests)
    .leftJoin(users, requests.userId.equals(users.id))
    .leftJoin(items, requests.itemId.equals(items.id));
  return requestList;
}
