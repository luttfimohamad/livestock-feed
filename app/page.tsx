import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/products"

export default function Home() {
  // Featured products for the homepage
  const featuredProducts = products.slice(0, 3)

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f9f4]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Premium Livestock Feed for Healthier Animals
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Scientifically formulated nutrition solutions to maximize growth, health, and productivity for all your
                livestock.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button className="bg-green-700 hover:bg-green-800">
                    Browse Products <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">Contact Us</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[600px] aspect-[3/2] overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                <Image
                  src="/images/hero-livestock.jpg"
                  alt="Healthy livestock in a green pasture"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Products</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our most popular livestock feed solutions, trusted by farmers worldwide.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} searchTerm={undefined} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/products">
              <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f9f4]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Our Feed</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our livestock feed products are designed with your animals' health and your success in mind.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white">
              <div className="p-3 rounded-full bg-green-100">
                <Leaf className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-xl font-bold">Natural Ingredients</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Made with high-quality, natural ingredients sourced from trusted suppliers.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white">
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-xl font-bold">Improved Growth</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Scientifically formulated to promote optimal growth and development in all livestock.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white">
              <div className="p-3 rounded-full bg-green-100">
                <Shield className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-xl font-bold">Health Protection</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Enhanced with vitamins and minerals to support immune function and overall health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="border rounded-lg p-6 bg-white">
              <p className="italic text-gray-500 dark:text-gray-400">
                "Since switching to these feed products, our cattle have shown remarkable improvements in health and
                weight gain. Highly recommended!"
              </p>
              <div className="mt-4">
                <p className="font-bold">John Smith</p>
                <p className="text-sm text-gray-500">Dairy Farmer, Wisconsin</p>
              </div>
            </div>
            <div className="border rounded-lg p-6 bg-white">
              <p className="italic text-gray-500 dark:text-gray-400">
                "The quality of these feeds is exceptional. Our poultry has never been healthier, and egg production has
                increased significantly."
              </p>
              <div className="mt-4">
                <p className="font-bold">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Poultry Farmer, Georgia</p>
              </div>
            </div>
            <div className="border rounded-lg p-6 bg-white">
              <p className="italic text-gray-500 dark:text-gray-400">
                "Customer service is outstanding, and the feed quality is consistent. Our pigs have shown better growth
                rates since we started using these products."
              </p>
              <div className="mt-4">
                <p className="font-bold">Michael Brown</p>
                <p className="text-sm text-gray-500">Pig Farmer, Iowa</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
