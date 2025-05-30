import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';
import ProductCard from '@/components/product-card';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const param = await params;
  const product = products.find((p) => p.id === param.id);

  if (!product) {
    return {
      title: 'Product Not Found - FarmFeed Pro',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} - FarmFeed Pro`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const param = await params;
  const product = products.find((p) => p.id === param.id);

  if (!product) {
    notFound();
  }

  // Get related products (same animal type)
  const relatedProducts = products
    .filter((p) => p.animalType === product.animalType && p.id !== product.id)
    .slice(0, 3);

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Link
            href="/products"
            className="flex items-center text-green-700 hover:text-green-800 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[500px] aspect-square overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                <Image
                  src={product.image || '/placeholder.svg?height=500&width=500'}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  {product.name}
                </h1>
                <p className="text-green-700 font-medium mt-2">
                  For {product.animalType}
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Key Benefits</h2>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-700 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Available Sizes</h2>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <div key={index} className="border rounded-md px-4 py-2">
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <Link href={`/quote?product=${product.id}`}>
                    <Button className="bg-green-700 hover:bg-green-800">
                      Get Quote for This Product
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
