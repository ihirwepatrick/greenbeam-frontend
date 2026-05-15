"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import SiteLogo from "../../../components/SiteLogo"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useSiteConfig } from "../../../hooks/use-api"
import { getSiteContent } from "../../../lib/site-content"

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>()
  const slug = typeof params?.slug === "string" ? decodeURIComponent(params.slug) : ""
  const { data: siteConfig } = useSiteConfig()
  const sc = useMemo(() => getSiteContent(siteConfig), [siteConfig])
  const post = sc.blog.posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 h-16 flex items-center">
            <SiteLogo />
          </div>
        </div>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <p className="text-gray-600 mb-6">This article does not exist or was removed.</p>
          <Link href="/blog">
            <Button variant="outline" className="border-greenbeam-teal text-greenbeam-teal">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <SiteLogo />
          <Link href="/blog" className="text-sm text-greenbeam-teal hover:underline">
            All posts
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center text-greenbeam-teal hover:underline text-sm mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to blog
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{post.title}</h1>
          {post.publishedAt ? (
            <time className="text-sm text-muted-foreground" dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(undefined, { dateStyle: "long" })}
            </time>
          ) : null}
        </header>

        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- CMS URLs may be arbitrary hosts
          <img src={post.coverImage} alt="" className="w-full max-h-80 object-cover rounded-lg mb-8" />
        ) : null}

        {post.excerpt ? <p className="text-lg text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p> : null}

        <div className="prose prose-neutral max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-base text-gray-800 leading-relaxed bg-transparent border-0 p-0 m-0">
            {post.body}
          </pre>
        </div>
      </article>
    </div>
  )
}
