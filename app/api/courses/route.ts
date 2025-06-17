import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const courses = await sql`
      SELECT 
        id,
        title,
        description,
        price,
        duration,
        level,
        image_url,
        instructor_id,
        created_at
      FROM courses
      ORDER BY created_at DESC
    `

    return NextResponse.json(courses)
  } catch (error) {
    console.error("Courses fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, price, duration, level, image_url, instructor_id } = body

    const result = await sql`
      INSERT INTO courses (title, description, price, duration, level, image_url, instructor_id)
      VALUES (${title}, ${description}, ${price}, ${duration}, ${level}, ${image_url}, ${instructor_id})
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Course creation error:", error)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}
