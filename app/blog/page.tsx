"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import SiteLogo from "../../components/SiteLogo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu } from "lucide-react"
import { useSiteConfig } from "../../hooks/use-api"
import { getSiteContent } from "../../lib/site-content"

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" {...props}>
    <path
      fill="currentColor"
      d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05zM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843z"
    />
  </svg>
)

export default function BlogListPage() {
  const { data: siteConfig } = useSiteConfig()
  const sc = useMemo(() => getSiteContent(siteConfig), [siteConfig])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const posts = sc.blog.posts

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <SiteLogo />
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-greenbeam-teal">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-greenbeam-teal">
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-greenbeam-teal">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-greenbeam-teal">
                Contact
              </Link>
              <Link href="/blog" className="text-greenbeam-teal font-medium">
                Blog
              </Link>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden border-t bg-white px-2 py-2 space-y-1">
              <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
              <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-greenbeam-teal hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                Blog
              </Link>
            </div>
          )}
        </div>
      </nav>

      <section className="bg-gradient-to-r from-greenbeam-teal to-greenbeam-teal-dark text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{sc.blog.listIntroTitle}</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">{sc.blog.listIntroBody}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {posts.length === 0 ? (
            <p className="text-center text-gray-600">No posts yet. Add posts in the admin Website settings.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.slug} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>
                      <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="text-greenbeam-teal hover:underline">
                        {post.title}
                      </Link>
                    </CardTitle>
                    {post.publishedAt ? (
                      <p className="text-sm text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString()}</p>
                    ) : null}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                      <Button variant="outline" size="sm" className="border-greenbeam-teal text-greenbeam-teal">
                        Read more
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
