

import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: './drizzle/schema.ts',
  dbCredentials: {
    "url": process.env.DATABASE_URL,
  },
 // namingConvention: {
 //   column: 'snake_case', // Use 'snake_case' to keep snake_case for columns
 //   table: 'snake_case',  // Use 'snake_case' to keep snake_case for tables
 // },
  introspect: {
    casing: 'preserve',
  },
  //casing: 'preserve',
  verbose: true,
  strict: true,
});

