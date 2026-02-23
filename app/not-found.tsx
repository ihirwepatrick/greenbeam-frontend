import Link from "next/link"
import SiteLogo from "../components/SiteLogo"
import { Button } from "@/components/ui/button"
import { Home, ShoppingBag, Mail } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center" aria-label="GreenBeam Home">
              <SiteLogo />
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm" className="border-greenbeam-teal text-greenbeam-teal hover:bg-greenbeam-teal hover:text-white">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-lg mx-auto">
          <p className="text-6xl sm:text-8xl font-bold text-greenbeam-teal/20 select-none">404</p>
          <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-foreground">
            Page not found
          </h1>
          <p className="mt-2 text-muted-foreground">
            The page you’re looking for doesn’t exist or has been moved. Here are some ways to get back on track.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto bg-greenbeam-teal hover:bg-greenbeam-teal/90 text-white">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="w-full sm:w-auto border-greenbeam-teal text-greenbeam-teal hover:bg-greenbeam-teal hover:text-white">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Browse products
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="w-full sm:w-auto text-muted-foreground hover:text-greenbeam-teal">
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
