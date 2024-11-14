import { db, conditions } from '../db.js';

export async function createCondition(conditionData) {
  const { name } = conditionData;
  const condition = await db.insert(conditions).values({
    name
  }).returning();
  return condition;
}

export async function findAllConditions() {
  const conditionList = await db.select().from(conditions);
  return conditionList;
}
