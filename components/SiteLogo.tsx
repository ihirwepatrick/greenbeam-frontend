"use client"

import Link from "next/link"
import Image from "next/image"

const LOGO_HOME_URL = "https://www.greenbeam.online"

export interface SiteLogoProps {
  /** Optional extra class for the wrapper (e.g. spacing). Logo is clipped to navbar height. */
  className?: string
  /** Show "Greenbeam" text next to the logo (e.g. product detail nav). */
  showBrandName?: boolean
}

/**
 * Shared site logo for the navbar. Clips to navbar height so the words stay visible
 * and sunburst/gear overflow is hidden. Links to home (greenbeam.online).
 */
export default function SiteLogo({ className = "", showBrandName = false }: SiteLogoProps) {
  return (
    <Link
      href={LOGO_HOME_URL}
      className={`flex items-center space-x-2 ${className}`}
      aria-label="Greenbeam – Go to homepage"
    >
      {/* Clip to navbar height (h-16) so only the text area is visible; overflow hidden clips the rest */}
      <span className="flex h-16 max-h-16 shrink-0 items-center overflow-hidden">
        <Image
          src="/logo.jpg"
          alt="Greenbeam Logo"
          width={300}
          height={135}
          className="h-16 w-auto max-h-16 object-contain object-center"
          priority
          sizes="(max-width: 768px) 180px, 240px"
        />
      </span>
      {showBrandName && (
        <span className="text-2xl font-bold text-[#0a6650]">Greenbeam</span>
      )}
    </Link>
  )
}
