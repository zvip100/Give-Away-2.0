import { db, users, eq } from '../db.js';
import { checkPW, signJWT } from '../middlewares.js';



export async function login(email, password) {
  const user = await db
    .select({ id: users.id, email: users.email, password: users.password, name: users.name })
    .from(users)
    .where(eq(users.email, email))
    .execute();
  if (!user || user.length === 0) {
    throw new Error('User not found');
  }
  const storedUser = user[0];
  const id = storedUser.id;
  const isPasswordValid = await checkPW(password, storedUser.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  const token = signJWT({ id });
  const username = storedUser.name;
  console.log("username: ", username)
  const userInfo = {
    id: storedUser.id, username: username, token: token
  }
  console.log("user info: ", userInfo)
  return  userInfo;
}