import { db, users,sql } from '../db.js';


export async function findUserById(id) {
  const user = await db
    .select()
    .from(users)
    .where(sql`${users.id} = ${id}`) 
    .execute();
  return user;
}
