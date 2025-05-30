import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formData, quoteItems, estimatedTotal } = body

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.farmType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Generate quote ID
    const quoteId = `QT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // In a real application, you would:
    // 1. Save quote to database
    // 2. Send confirmation email to customer
    // 3. Send notification to sales team
    // 4. Generate PDF quote document

    // Simulate quote processing
    console.log("Quote request submission:", {
      quoteId,
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        farmType: formData.farmType,
      },
      products: quoteItems,
      estimatedTotal,
      timestamp: new Date().toISOString(),
    })

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return NextResponse.json({
      success: true,
      quoteId,
      message:
        "Your quote request has been submitted successfully. We'll send you a detailed proposal within 24 hours.",
    })
  } catch (error) {
    console.error("Quote request error:", error)
    return NextResponse.json({ error: "Failed to submit quote request. Please try again." }, { status: 500 })
  }
}
