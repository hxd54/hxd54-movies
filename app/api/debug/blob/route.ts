import { NextResponse } from "next/server"
import { storage } from "@/lib/storage"

export async function GET() {
  try {
    // Test Blob storage connection
    const testResult = await storage.testStorage()

    // Get environment variable status (without exposing the actual token)
    const blobTokenStatus = !!process.env.BLOB_READ_WRITE_TOKEN

    return NextResponse.json({
      status: testResult.success ? "ok" : "error",
      message: testResult.message,
      blobTokenAvailable: blobTokenStatus,
      testUrl: testResult.url,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in debug endpoint:", error)
    return NextResponse.json(
      {
        status: "error",
        message: `Error in debug endpoint: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
