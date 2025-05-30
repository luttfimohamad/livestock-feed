import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  searchTerm?: string
}

export default function ProductCard({ product, searchTerm }: ProductCardProps) {
  // Function to highlight search terms in text
  const highlightText = (text: string, term: string) => {
    if (!term) return text

    const regex = new RegExp(`(${term})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background hover:shadow-lg transition-all duration-200">
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {product.name}</span>
      </Link>
      <div className="aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
            {searchTerm ? highlightText(product.animalType, searchTerm) : product.animalType}
          </span>
        </div>
        <h3 className="font-semibold">{searchTerm ? highlightText(product.name, searchTerm) : product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {searchTerm ? highlightText(product.description, searchTerm) : product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-green-700">${product.price.toFixed(2)}</span>
          <span className="text-xs text-gray-500">{product.sizes[0]}</span>
        </div>
      </div>
    </div>
  )
}
