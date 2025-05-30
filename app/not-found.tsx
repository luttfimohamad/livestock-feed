import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-500 mb-8 max-w-md">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/">
        <Button className="bg-green-700 hover:bg-green-800">Return to Home</Button>
      </Link>
    </main>
  )
}
