import { NextResponse } from "next/server"
import { storage } from "@/lib/storage"

// GET handler for movies
export async function GET() {
  try {
    const data = await storage.getAllData()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

// POST handler for updating movies
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate the incoming data
    if (!data.movies || !Array.isArray(data.movies)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    // Clear existing movies and add new ones
    for (const movie of data.movies) {
      await storage.addMovie(movie)
    }

    // Update category recommendations
    if (data.categoryRecommendations && Array.isArray(data.categoryRecommendations)) {
      for (const rec of data.categoryRecommendations) {
        await storage.updateCategoryRecommendation(rec.categoryName, rec.movieId)
      }
    }

    // Update user interactions
    if (data.userInteractions && Array.isArray(data.userInteractions)) {
      for (const interaction of data.userInteractions) {
        await storage.updateUserInteraction(interaction.movieId, interaction.liked)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating data:", error)
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
  }
}
