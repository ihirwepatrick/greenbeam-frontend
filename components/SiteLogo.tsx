"use client"

import Link from "next/link"
import Image from "next/image"

const LOGO_HOME_URL = "https://www.greenbeam.online"

export interface SiteLogoProps {
  /** Optional extra class for the wrapper (e.g. spacing). Logo is clipped to navbar height. */
  className?: string
  /** Show "Greenbeam" text next to the logo (e.g. product detail nav). */
  showBrandName?: boolean
  /** "footer" = smaller logo for footer; default = navbar size. */
  variant?: "default" | "footer"
}

const logoHeights = { default: "h-16 max-h-16", footer: "h-20 max-h-20" }
/** Teal logo for navbar (white bg); white logo for footer (dark bg). Source images 1296x577. */
const logoSources = { default: "/logo-renovated-teal.png", footer: "/logo-renovated-white.png" }

/**
 * Shared site logo for the navbar and footer. Navbar uses teal logo, footer uses white logo.
 * Links to home (greenbeam.online).
 */
export default function SiteLogo({ className = "", showBrandName = false, variant = "default" }: SiteLogoProps) {
  const sizeClass = logoHeights[variant]
  const src = logoSources[variant]
  return (
    <Link
      href={LOGO_HOME_URL}
      className={`flex items-center space-x-2 ${className}`}
      aria-label="Greenbeam – Go to homepage"
    >
      <span className={`flex ${sizeClass} shrink-0 items-center overflow-hidden`}>
        <Image
          src={src}
          alt="Greenbeam Logo"
          width={1296}
          height={577}
          className={`${sizeClass} w-auto object-contain object-center`}
          priority={variant === "default"}
          sizes={variant === "footer" ? "320px" : "(max-width: 768px) 180px, 240px"}
        />
      </span>
      {showBrandName && (
        <span className="text-2xl font-bold text-greenbeam-teal">Greenbeam</span>
      )}
    </Link>
  )
}
