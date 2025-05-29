import { NextResponse } from "next/server"
import { z } from "zod"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate the form data
    const result = formSchema.safeParse(body)

    if (!result.success) {
      // Return validation errors
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 })
    }

    const { name, email, phone, subject, message } = result.data

    // In a real application, you would:
    // 1. Store the message in a database
    // 2. Send an email notification
    // 3. Possibly integrate with a CRM

    // For demonstration, we'll just log the data
    console.log("Contact form submission:", { name, email, phone, subject, message })

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success response
    return NextResponse.json({ success: true, message: "Message received" })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
