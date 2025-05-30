"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("") // Clear error when user starts typing
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-700" />
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Message Sent Successfully!
              </h1>
              <p className="text-gray-500 md:text-xl mb-8">
                Thank you for contacting us. Our team will review your message and get back to you within 24 hours.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
                <ul className="text-sm text-green-700 space-y-1 text-left">
                  <li>• Our customer service team will review your inquiry</li>
                  <li>• You'll receive a confirmation email shortly</li>
                  <li>• We'll respond with detailed information within 24 hours</li>
                  <li>• For urgent matters, feel free to call us directly</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                    })
                  }}
                  className="bg-green-700 hover:bg-green-800"
                >
                  Send Another Message
                </Button>
                <Button variant="outline" onClick={() => (window.location.href = "/products")}>
                  Browse Products
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Have questions about our products? Need a custom feed solution? Our team is here to help.
              </p>
            </div>
          </div>

          <div className="grid gap-8 mt-12 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form and our team will get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First name *
                      </label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last name *
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email *
                    </label>
                    <Input
                      id="email"
                      placeholder="john.doe@example.com"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      placeholder="(123) 456-7890"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      placeholder="Product Inquiry"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your livestock and feed requirements..."
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Contact Information</h2>
                <p className="text-gray-500 dark:text-gray-400">You can also reach us using the information below.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="mr-4 h-6 w-6 text-green-700" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      123 Farm Road
                      <br />
                      Heartland, MO 12345
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="mr-4 h-6 w-6 text-green-700" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      <a href="tel:+11234567890" className="hover:text-green-700">
                        (123) 456-7890
                      </a>
                      <br />
                      Monday - Friday, 8am - 5pm CST
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="mr-4 h-6 w-6 text-green-700" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      <a href="mailto:info@farmfeedpro.com" className="hover:text-green-700">
                        info@farmfeedpro.com
                      </a>
                      <br />
                      <a href="mailto:sales@farmfeedpro.com" className="hover:text-green-700">
                        sales@farmfeedpro.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t">
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t">
                <h3 className="text-xl font-bold mb-4">Request a Quote</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Need bulk pricing or a custom feed formulation? Contact our sales team for a personalized quote.
                </p>
                <Link href="/quote">
                  <Button className="bg-green-700 hover:bg-green-800">Request Quote</Button>
                </Link>
              </div>

              <div className="pt-6 mt-6 border-t">
                <h3 className="text-xl font-bold mb-4">Emergency Support</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-2">For urgent feed-related issues or emergencies:</p>
                <p className="font-medium">
                  <a href="tel:+11234567899" className="text-green-700 hover:text-green-800">
                    Emergency Line: (123) 456-7899
                  </a>
                </p>
                <p className="text-sm text-gray-500">Available 24/7 for existing customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
