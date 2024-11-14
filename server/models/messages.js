import { db, messages, users } from '../db.js';

export async function createMessage(messageData) {
  const { userId, content, createdAt } = messageData;
  const message = await db.insert(messages).values({
    user_id: userId,
    content,
    created_at: createdAt
  }).returning();
  return message;
}

export async function findAllMessages() {
  const messageList = await db.select().from(messages)
    .leftJoin(users, messages.userId.equals(users.id));
  return messageList;
}
