import { NextResponse } from "next/server"
import { storage } from "@/lib/storage"

// POST to like or dislike a movie
export async function POST(request: Request) {
  try {
    const { movieId, userId, liked } = await request.json()

    if (!movieId || !userId || liked === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get all movies
    const movies = await storage.getMovies()
    const movieIndex = movies.findIndex((m) => m.id === movieId)

    if (movieIndex === -1) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    // Get current interaction
    const userInteractions = await storage.getUserInteractions()
    const currentInteraction = userInteractions.find(
      (interaction) => interaction.movieId === movieId && interaction.userId === userId,
    )

    // If user already interacted with this movie, don't allow changes
    if (currentInteraction) {
      return NextResponse.json({
        success: false,
        message: "User has already interacted with this movie",
      })
    }

    // Update movie likes/dislikes
    const movie = movies[movieIndex]

    if (liked === true) {
      // Increment likes
      movie.likes += 1
    } else {
      // Increment dislikes
      movie.dislikes += 1
    }

    // Update the movie
    await storage.updateMovie(movieId, movie)

    // Update user interaction
    await storage.updateUserInteraction(movieId, userId, liked)

    return NextResponse.json({ success: true, movie })
  } catch (error) {
    console.error("Error updating interaction:", error)
    return NextResponse.json({ error: "Failed to update interaction" }, { status: 500 })
  }
}
