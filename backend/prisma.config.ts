import path from 'node:path'
import { defineConfig } from 'prisma/config'
import 'dotenv/config'

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
  migrate: {
    async adapter() {
      const { PrismaPg } = await import('@prisma/adapter-pg')
      const pool = new (await import('pg')).default.Pool({
        connectionString: process.env.DATABASE_URL,
      })
      return new PrismaPg(pool)
    },
  },
})
