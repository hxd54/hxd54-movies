import { NextResponse } from "next/server"
import { storage } from "@/lib/storage"

// GET a specific movie by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const movies = await storage.getMovies()
    const movie = movies.find((m) => m.id === id)

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    return NextResponse.json(movie)
  } catch (error) {
    console.error("Error fetching movie:", error)
    return NextResponse.json({ error: "Failed to fetch movie" }, { status: 500 })
  }
}

// DELETE a movie by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const success = await storage.removeMovie(id)

    if (!success) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting movie:", error)
    return NextResponse.json({ error: "Failed to delete movie" }, { status: 500 })
  }
}

// PUT to update a movie
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const updateData = await request.json()
    const success = await storage.updateMovie(id, updateData)

    if (!success) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    const movies = await storage.getMovies()
    const updatedMovie = movies.find((m) => m.id === id)

    return NextResponse.json(updatedMovie)
  } catch (error) {
    console.error("Error updating movie:", error)
    return NextResponse.json({ error: "Failed to update movie" }, { status: 500 })
  }
}
