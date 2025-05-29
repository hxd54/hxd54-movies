import { NextResponse } from "next/server"
import { storage } from "@/lib/storage"

// GET all category recommendations
export async function GET() {
  try {
    const categoryRecommendations = await storage.getCategoryRecommendations()
    return NextResponse.json(categoryRecommendations)
  } catch (error) {
    console.error("Error fetching recommendations:", error)
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
  }
}

// POST to update a category recommendation
export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.categoryName || !data.movieId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update the recommendation
    await storage.updateCategoryRecommendation(data.categoryName, data.movieId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating recommendation:", error)
    return NextResponse.json({ error: "Failed to update recommendation" }, { status: 500 })
  }
}
