"use client"

import { useState, useMemo } from "react"
import { products } from "@/lib/products"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAnimalType, setSelectedAnimalType] = useState("all")
  const [sortOption, setSortOption] = useState("name-asc")

  // Get unique animal types for filter dropdown
  const animalTypes = useMemo(() => {
    const types = [...new Set(products.map((product) => product.animalType))]
    return types.sort()
  }, [])

  // Filter and sort products based on current selections
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.animalType.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply animal type filter
    if (selectedAnimalType !== "all") {
      filtered = filtered.filter((product) => product.animalType === selectedAnimalType)
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        default:
          return 0
      }
    })

    return sorted
  }, [searchTerm, selectedAnimalType, sortOption])

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedAnimalType("all")
    setSortOption("name-asc")
  }

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Products</h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Browse our complete range of livestock feed products, formulated for optimal nutrition and health.
            </p>
          </div>

          {/* Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mt-8 mb-8">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={selectedAnimalType} onValueChange={setSelectedAnimalType}>
                <SelectTrigger>
                  <SelectValue placeholder="Animal Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Animals</SelectItem>
                  {animalTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="border-green-700 text-green-700 hover:bg-green-50"
            >
              Clear Filters
            </Button>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              Showing {filteredAndSortedProducts.length} of {products.length} products
              {searchTerm && <span className="ml-1">for "{searchTerm}"</span>}
              {selectedAnimalType !== "all" && <span className="ml-1">in {selectedAnimalType}</span>}
            </p>
          </div>

          {/* Products Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button onClick={handleClearFilters} className="bg-green-700 hover:bg-green-800">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
