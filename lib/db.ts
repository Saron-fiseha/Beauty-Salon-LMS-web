import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required")
}

// Serverless-optimized connection - no connection pooling needed
export const sql = neon(process.env.DATABASE_URL)

// Serverless query function - each invocation is stateless
export async function query(text: string, params?: any[]) {
  try {
    const result = await sql(text, params || [])
    return { rows: Array.isArray(result) ? result : [result] }
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
