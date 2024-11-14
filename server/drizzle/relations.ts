import { relations } from "drizzle-orm/relations";
import { items, requests, conditions, categories, postcategories } from "./schema";

export const requestsRelations = relations(requests, ({one}) => ({
	item: one(items, {
		fields: [requests.itemid],
		references: [items.id]
	}),
}));

export const itemsRelations = relations(items, ({one, many}) => ({
	requests: many(requests),
	condition: one(conditions, {
		fields: [items.condition_id],
		references: [conditions.id]
	}),
	category: one(categories, {
		fields: [items.category_id],
		references: [categories.id]
	}),
}));

export const conditionsRelations = relations(conditions, ({many}) => ({
	items: many(items),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	items: many(items),
	postcategories: many(postcategories),
}));

export const postcategoriesRelations = relations(postcategories, ({one}) => ({
	category: one(categories, {
		fields: [postcategories.categoryid],
		references: [categories.id]
	}),
}));