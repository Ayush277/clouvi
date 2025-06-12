
import { table } from 'console';
import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({path:".env.local"});      
if(!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the environment variables.");
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },

  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
  verbose: true, //it will show all the queries that are being executed
  strict: true, //it will throw an error if there are any missing fields in the schema

});

// This configuration file is used to set up the Drizzle ORM with PostgreSQL.
// It specifies the output directory for generated files, the schema file, the dialect,
// and the database credentials using environment variables.
// The dotenv package is used to load environment variables from a .env.local file.
// The defineConfig function from drizzle-kit is used to create the configuration object.
// The configuration is exported as the default export of the module.
// The DATABASE_URL environment variable is expected to be set in the .env.local file.
// The output directory is set to './drizzle', where the generated files will be stored.
// The schema file is specified as './src/db/schema.ts', which contains the database schema definitions.
// The dialect is set to 'postgresql', indicating that the PostgreSQL database will be used.
// The dbCredentials object contains the database URL, which is required for connecting to the database.
// This configuration is essential for the Drizzle ORM to function correctly with PostgreSQL.  
