import { NextResponse } from "next/server"
import { storage } from "@/lib/storage"

export async function GET() {
  try {
    const isStorageAvailable = storage.isStorageAvailable
    const blobTokenStatus = !!process.env.BLOB_READ_WRITE_TOKEN

    // Get movie count to verify data access
    const movies = await storage.getMovies()

    return NextResponse.json({
      status: "ok",
      storage: isStorageAvailable ? "Vercel Blob" : "In-memory",
      blobTokenAvailable: blobTokenStatus,
      movieCount: movies.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error checking status:", error)
    return NextResponse.json(
      {
        status: "error",
        message: `Error checking status: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
