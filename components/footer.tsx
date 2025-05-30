import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-700">FarmFeed Pro</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Premium livestock feed products for healthier animals and more productive farms.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-green-700">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-green-700">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-green-700">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Products</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/products?type=cattle" className="hover:text-green-700">
                  Cattle Feed
                </Link>
              </li>
              <li>
                <Link href="/products?type=poultry" className="hover:text-green-700">
                  Poultry Feed
                </Link>
              </li>
              <li>
                <Link href="/products?type=swine" className="hover:text-green-700">
                  Swine Feed
                </Link>
              </li>
              <li>
                <Link href="/products?type=sheep" className="hover:text-green-700">
                  Sheep & Goat Feed
                </Link>
              </li>
              <li>
                <Link href="/products?type=horses" className="hover:text-green-700">
                  Horse Feed
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/about" className="hover:text-green-700">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-700">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-green-700">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-green-700">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-green-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-green-700">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-green-700">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} FarmFeed Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
