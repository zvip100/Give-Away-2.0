import { db, categories } from "../db.js"; // Ensure to use .js extension

export async function createCategory(categoryData) {
  const { name } = categoryData;
  const { description } = categoryData;
  //console.log(name)
  const category = await db
    .insert(categories)
    .values({
      name,
      description,
    })
    .returning();

  return category;
}

export async function findAllCategories() {
  const categoryList = await db.select().from(categories);
  return categoryList;
}
