import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

const sqliteConnection = {
  filename: env.DATABASE_URL,
}

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? sqliteConnection
      : {
          connectionString: env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false,
          },
        },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
