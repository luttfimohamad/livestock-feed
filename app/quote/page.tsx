"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { products } from "@/lib/products"
import { Calculator, CheckCircle, Mail, Phone, User, AlertCircle } from "lucide-react"

interface QuoteItem {
  productId: string
  quantity: number
  size: string
}

export default function QuotePage() {
  const searchParams = useSearchParams()
  const preselectedProduct = searchParams.get("product")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    farmType: "",
    message: "",
  })
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [quoteId, setQuoteId] = useState("")

  // Add preselected product if coming from product page
  useEffect(() => {
    if (preselectedProduct) {
      const product = products.find((p) => p.id === preselectedProduct)
      if (product) {
        setQuoteItems([
          {
            productId: preselectedProduct,
            quantity: 1,
            size: product.sizes[0],
          },
        ])
      }
    }
  }, [preselectedProduct])

  const farmTypes = [
    "Dairy Farm",
    "Beef Cattle Ranch",
    "Poultry Farm",
    "Swine Operation",
    "Sheep/Goat Farm",
    "Horse Stable/Ranch",
    "Mixed Livestock",
    "Other",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("") // Clear error when user starts typing
  }

  const addQuoteItem = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      setQuoteItems((prev) => [
        ...prev,
        {
          productId,
          quantity: 1,
          size: product.sizes[0],
        },
      ])
    }
  }

  const removeQuoteItem = (index: number) => {
    setQuoteItems((prev) => prev.filter((_, i) => i !== index))
  }

  const updateQuoteItem = (index: number, field: keyof QuoteItem, value: string | number) => {
    setQuoteItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  const calculateEstimate = () => {
    return quoteItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId)
      if (product) {
        // Simple pricing calculation - in real app this would be more complex
        let multiplier = 1
        if (item.size.includes("50 lb")) multiplier = 1.8
        if (item.size.includes("1 ton")) multiplier = 35
        return total + product.price * item.quantity * multiplier
      }
      return total
    }, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          quoteItems,
          estimatedTotal: calculateEstimate(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quote request")
      }

      setQuoteId(data.quoteId)
      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit quote request. Please try again.")
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
                Quote Request Submitted!
              </h1>
              <p className="text-gray-500 md:text-xl mb-4">
                Thank you for your quote request. Our team will review your requirements and get back to you within 24
                hours with a detailed proposal.
              </p>
              {quoteId && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                  <p className="text-sm text-blue-700">
                    <strong>Quote Reference ID:</strong> {quoteId}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">Please save this ID for your records</p>
                </div>
              )}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
                <ul className="text-sm text-green-700 space-y-1 text-left">
                  <li>• Our nutrition specialist will review your requirements</li>
                  <li>• We'll prepare a customized quote with bulk pricing</li>
                  <li>• You'll receive a detailed proposal via email</li>
                  <li>• We'll schedule a call to discuss your specific needs</li>
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
                      company: "",
                      farmType: "",
                      message: "",
                    })
                    setQuoteItems([])
                    setQuoteId("")
                  }}
                  className="bg-green-700 hover:bg-green-800"
                >
                  Request Another Quote
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
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f9f4]">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Request a Custom Quote
              </h1>
              <p className="text-gray-500 md:text-xl">
                Get personalized pricing for bulk orders and custom feed solutions tailored to your livestock needs.
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-700 max-w-2xl mx-auto">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Quote Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>Tell us about yourself and your operation</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium">
                          First Name *
                        </label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium">
                          Last Name *
                        </label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Farm/Company Name
                      </label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="farmType" className="text-sm font-medium">
                        Type of Operation *
                      </label>
                      <Select value={formData.farmType} onValueChange={(value) => handleInputChange("farmType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your farm type" />
                        </SelectTrigger>
                        <SelectContent>
                          {farmTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Additional Requirements
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your specific needs, delivery requirements, or any questions..."
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Product Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Product Selection
                  </CardTitle>
                  <CardDescription>Add products to your quote request</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Product Selection Dropdown */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Add Product</label>
                    <Select onValueChange={addQuoteItem}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product to add" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} - {product.animalType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Selected Products */}
                  {quoteItems.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium">Selected Products:</h4>
                      {quoteItems.map((item, index) => {
                        const product = products.find((p) => p.id === item.productId)
                        if (!product) return null

                        return (
                          <div key={index} className="border rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-sm">{product.name}</h5>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeQuoteItem(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Remove
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-xs text-gray-500">Quantity</label>
                                <Input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuoteItem(index, "quantity", Number.parseInt(e.target.value) || 1)
                                  }
                                  className="h-8"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-500">Size</label>
                                <Select
                                  value={item.size}
                                  onValueChange={(value) => updateQuoteItem(index, "size", value)}
                                >
                                  <SelectTrigger className="h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {product.sizes.map((size) => (
                                      <SelectItem key={size} value={size}>
                                        {size}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        )
                      })}

                      {/* Estimate */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Estimated Total:</span>
                          <span className="text-xl font-bold text-green-700">${calculateEstimate().toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">
                          *This is a rough estimate. Final pricing may vary based on bulk discounts and delivery.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      !formData.firstName || !formData.lastName || !formData.email || !formData.farmType || isLoading
                    }
                    className="w-full bg-green-700 hover:bg-green-800"
                  >
                    {isLoading ? "Submitting..." : "Request Quote"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="font-semibold mb-2">Fast Response</h3>
                <p className="text-sm text-gray-500">Get your custom quote within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calculator className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="font-semibold mb-2">Bulk Pricing</h3>
                <p className="text-sm text-gray-500">Special discounts for large orders</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="font-semibold mb-2">Expert Consultation</h3>
                <p className="text-sm text-gray-500">Free nutrition advice from our specialists</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
