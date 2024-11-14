import { db, users, eq } from '../db.js';
import { checkPW, hashPW, signJWT, verifyJWT } from '../middlewares.js';

export async function createUser(userData) { // Add res as a parameter
  const { email, password, firstName, lastName, address, phone } = userData;
  console.log(userData)
  const name = `${firstName} ${lastName}`;

  try {
    const hashedPassword = await hashPW(password);
    const user = await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
      address,
      phone,
      verified: false // Assuming you want to set this initially as false
    }).returning({ id: users.id });
    return { email, id: user[0] };
  } catch (err) {
    console.error(err); // Log the error for debugging
    let msg = err.message;
    if (msg.includes("Users_email_unique")) {
      throw new Error("User already exists");
    }
    throw new Error("Internal Server Error");
  }
}

// Function to verify a user  , not implemented & not tested
export const verifyUser = async (token) => {
  try {
    const decoded = verifyJWT(token);
    const user = await db.select().from(users).where(users.email.eq(decoded.email)).execute();

    if (!user || user.length === 0) {
      throw new Error('User not found');
    }

    await db.update(users).set({ verified: true }).where(users.email.eq(decoded.email)).execute();
    return user[0];
  } catch (err) {
    throw new Error('Invalid verification token');
  }
};


export async function login(email, password) {
  // Fetch the user by email
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email)) // Only check by email first
    .execute();

  if (!user || user.length === 0) {
    throw new Error('User not found');
  }
  const storedUser = user[0];

  // Verify the password
  const isPasswordValid = await checkPW(password, storedUser.password); // Adjust this line to your password verification logic
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  const token = signJWT({ email });

  return { user: storedUser, token }; // Return user data and token
}