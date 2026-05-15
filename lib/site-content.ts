/**
 * Typed accessors for public site config (`useSiteConfig` data).
 * Merges API `website.content` with defaults so pages stay readable.
 */

export type ValuePropIcon = "zap" | "shield" | "truck" | "leaf"

export type FooterLink = { label: string; href: string }

export type SiteBlogPost = {
  slug: string
  title: string
  excerpt: string
  body: string
  publishedAt?: string
  coverImage?: string
}

export type SiteContent = {
  valueProps: Array<{ title: string; description: string; icon: ValuePropIcon }>
  homeCategories: { title: string; subtitle: string }
  newsletter: { title: string; subtitle: string; placeholder: string; buttonLabel: string }
  featuredSection: { title: string; viewAllLabel: string; emptyTitle: string; emptyBody: string }
  footerNav: {
    productsTitle: string
    companyTitle: string
    supportTitle: string
    productLinks: FooterLink[]
    companyLinks: FooterLink[]
    supportLinks: FooterLink[]
  }
  productPage: {
    specsSectionTitle: string
    technicalDetailsTitle: string
    labelCategory: string
    labelRating: string
    labelStatus: string
    labelAdded: string
    installationTitle: string
    installationBullets: string[]
    relatedTitle: string
    relatedSubtitle: string
    relatedButton: string
  }
  cartPage: {
    loadingText: string
    emptyTitle: string
    emptyBody: string
    pageTitle: string
    continueShoppingLabel: string
    browseProductsLabel: string
  }
  checkoutPage: {
    pageTitle: string
    pageSubtitle: string
    termsLabel: string
    cartEmptyTitle: string
    cartEmptyBody: string
    continueShoppingButton: string
  }
  blog: { listIntroTitle: string; listIntroBody: string; posts: SiteBlogPost[] }
  /** Short marketing line (from `website.content.siteDescription`). */
  siteTagline: string
  /** From `website.content.footer.copyrightText`. */
  footerCopyright: string
}

const DEFAULT_VALUE_PROPS: SiteContent["valueProps"] = [
  { icon: "zap", title: "High Efficiency", description: "Premium quality equipment with maximum energy output" },
  { icon: "shield", title: "25-Year Warranty", description: "Long-term protection for your investment" },
  { icon: "truck", title: "Free Installation", description: "Professional installation included with every purchase" },
  { icon: "leaf", title: "Eco-Friendly", description: "Reduce your carbon footprint and save money" },
]

const DEFAULTS: SiteContent = {
  valueProps: DEFAULT_VALUE_PROPS,
  homeCategories: {
    title: "Shop by Category",
    subtitle: "Discover our comprehensive range of sustainable energy solutions",
  },
  newsletter: {
    title: "Stay Updated",
    subtitle: "Get the latest news on green energy solutions and exclusive offers",
    placeholder: "Enter your email",
    buttonLabel: "Subscribe",
  },
  featuredSection: {
    title: "Featured Products",
    viewAllLabel: "View All Products",
    emptyTitle: "No Products Available",
    emptyBody: "Check back soon for our sustainable energy solutions!",
  },
  footerNav: {
    productsTitle: "Products",
    companyTitle: "Company",
    supportTitle: "Support",
    productLinks: [
      { label: "Solar Panels", href: "/products?category=Solar%20Panels" },
      { label: "Wind Turbines", href: "/products?category=Wind%20Energy" },
      { label: "Battery Storage", href: "/products?category=Energy%20Storage" },
      { label: "Inverters", href: "/products?category=Inverters" },
    ],
    companyLinks: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
    supportLinks: [
      { label: "Help Center", href: "/contact" },
      { label: "Shipping Info", href: "/contact" },
      { label: "Returns", href: "/contact" },
    ],
  },
  productPage: {
    specsSectionTitle: "Product Specifications",
    technicalDetailsTitle: "Technical Details",
    labelCategory: "Category",
    labelRating: "Rating",
    labelStatus: "Status",
    labelAdded: "Added",
    installationTitle: "Installation & Support",
    installationBullets: [
      "Professional installation included",
      "24/7 technical support",
      "Maintenance services available",
      "Training and documentation",
    ],
    relatedTitle: "Looking for More Options?",
    relatedSubtitle: "Explore our complete range of sustainable energy solutions",
    relatedButton: "Browse All Products",
  },
  cartPage: {
    loadingText: "Loading your cart...",
    emptyTitle: "Your cart is empty",
    emptyBody: "Start shopping to add items to your cart.",
    pageTitle: "Shopping Cart",
    continueShoppingLabel: "Continue Shopping",
    browseProductsLabel: "Browse Products",
  },
  checkoutPage: {
    pageTitle: "Checkout",
    pageSubtitle: "Complete your purchase",
    termsLabel: "I accept the terms and conditions",
    cartEmptyTitle: "Your cart is empty",
    cartEmptyBody: "Add some items to your cart before checking out.",
    continueShoppingButton: "Continue Shopping",
  },
  blog: {
    listIntroTitle: "Blog",
    listIntroBody: "News and updates from Greenbeam.",
    posts: [],
  },
  siteTagline: "Leading provider of sustainable energy solutions for homes and businesses in Rwanda",
  footerCopyright: "© Greenbeam. All rights reserved.",
}

function mergeFooterLinks(raw: unknown, fallback: FooterLink[]): FooterLink[] {
  if (!Array.isArray(raw)) return fallback
  const out = raw
    .map((item) => {
      if (!item || typeof item !== "object") return null
      const o = item as Record<string, unknown>
      const label = typeof o.label === "string" ? o.label : ""
      const href = typeof o.href === "string" ? o.href : ""
      if (!label || !href) return null
      return { label, href }
    })
    .filter(Boolean) as FooterLink[]
  return out.length ? out : fallback
}

function mergeValueProps(raw: unknown): SiteContent["valueProps"] {
  if (!Array.isArray(raw) || raw.length === 0) return DEFAULTS.valueProps.map((v) => ({ ...v }))
  const icons: ValuePropIcon[] = ["zap", "shield", "truck", "leaf"]
  const parsed = raw
    .map((item, i) => {
      if (!item || typeof item !== "object") return null
      const o = item as Record<string, unknown>
      const title = typeof o.title === "string" ? o.title : ""
      const description = typeof o.description === "string" ? o.description : ""
      let icon = (typeof o.icon === "string" ? o.icon : "zap") as ValuePropIcon
      if (!icons.includes(icon)) icon = icons[i % 4]!
      if (!title) return null
      return { title, description, icon }
    })
    .filter(Boolean) as SiteContent["valueProps"]
  return parsed.length ? parsed : DEFAULTS.valueProps
}

function mergeBlogPosts(raw: unknown): SiteBlogPost[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((item) => {
      if (!item || typeof item !== "object") return null
      const o = item as Record<string, unknown>
      const slug = typeof o.slug === "string" ? o.slug : ""
      const title = typeof o.title === "string" ? o.title : ""
      if (!slug || !title) return null
      return {
        slug,
        title,
        excerpt: typeof o.excerpt === "string" ? o.excerpt : "",
        body: typeof o.body === "string" ? o.body : "",
        publishedAt: typeof o.publishedAt === "string" ? o.publishedAt : undefined,
        coverImage: typeof o.coverImage === "string" ? o.coverImage : undefined,
      }
    })
    .filter(Boolean) as SiteBlogPost[]
}

/** siteConfig = useSiteConfig().data (shape { website, general }) */
export function getSiteContent(siteConfig: unknown): SiteContent {
  const root = siteConfig as { website?: Record<string, unknown>; general?: Record<string, unknown> } | null
  const website = root?.website
  const general = root?.general || {}
  const content = (website?.content as Record<string, unknown>) || {}
  const homeCategories = (content.homeCategories as Record<string, unknown>) || {}
  const newsletter = (content.newsletter as Record<string, unknown>) || {}
  const featured = (content.featuredSection as Record<string, unknown>) || {}
  const footerNav = (content.footerNav as Record<string, unknown>) || {}
  const productPage = (content.productPage as Record<string, unknown>) || {}
  const cartPage = (content.cartPage as Record<string, unknown>) || {}
  const checkoutPage = (content.checkoutPage as Record<string, unknown>) || {}
  const blog = (content.blog as Record<string, unknown>) || {}
  const footer = (content.footer as Record<string, unknown>) || {}
  const bullets = productPage.installationBullets

  const year = new Date().getFullYear()
  const defaultCopyright = `© ${year} Greenbeam. All rights reserved. | Kigali, Rwanda`

  return {
    valueProps: mergeValueProps(content.valueProps),
    homeCategories: {
      title: (homeCategories.title as string) || DEFAULTS.homeCategories.title,
      subtitle: (homeCategories.subtitle as string) || DEFAULTS.homeCategories.subtitle,
    },
    newsletter: {
      title: (newsletter.title as string) || DEFAULTS.newsletter.title,
      subtitle: (newsletter.subtitle as string) || DEFAULTS.newsletter.subtitle,
      placeholder: (newsletter.placeholder as string) || DEFAULTS.newsletter.placeholder,
      buttonLabel: (newsletter.buttonLabel as string) || (newsletter.button as string) || DEFAULTS.newsletter.buttonLabel,
    },
    featuredSection: {
      title: (featured.title as string) || DEFAULTS.featuredSection.title,
      viewAllLabel: (featured.viewAllLabel as string) || DEFAULTS.featuredSection.viewAllLabel,
      emptyTitle: (featured.emptyTitle as string) || DEFAULTS.featuredSection.emptyTitle,
      emptyBody: (featured.emptyBody as string) || DEFAULTS.featuredSection.emptyBody,
    },
    footerNav: {
      productsTitle: (footerNav.productsTitle as string) || DEFAULTS.footerNav.productsTitle,
      companyTitle: (footerNav.companyTitle as string) || DEFAULTS.footerNav.companyTitle,
      supportTitle: (footerNav.supportTitle as string) || DEFAULTS.footerNav.supportTitle,
      productLinks: mergeFooterLinks(footerNav.productLinks, DEFAULTS.footerNav.productLinks),
      companyLinks: mergeFooterLinks(footerNav.companyLinks, DEFAULTS.footerNav.companyLinks),
      supportLinks: mergeFooterLinks(footerNav.supportLinks, DEFAULTS.footerNav.supportLinks),
    },
    productPage: {
      specsSectionTitle: (productPage.specsSectionTitle as string) || DEFAULTS.productPage.specsSectionTitle,
      technicalDetailsTitle: (productPage.technicalDetailsTitle as string) || DEFAULTS.productPage.technicalDetailsTitle,
      labelCategory: (productPage.labelCategory as string) || DEFAULTS.productPage.labelCategory,
      labelRating: (productPage.labelRating as string) || DEFAULTS.productPage.labelRating,
      labelStatus: (productPage.labelStatus as string) || DEFAULTS.productPage.labelStatus,
      labelAdded: (productPage.labelAdded as string) || DEFAULTS.productPage.labelAdded,
      installationTitle: (productPage.installationTitle as string) || DEFAULTS.productPage.installationTitle,
      installationBullets: Array.isArray(bullets)
        ? (bullets as unknown[]).map((x) => String(x)).filter(Boolean)
        : [...DEFAULTS.productPage.installationBullets],
      relatedTitle: (productPage.relatedTitle as string) || DEFAULTS.productPage.relatedTitle,
      relatedSubtitle: (productPage.relatedSubtitle as string) || DEFAULTS.productPage.relatedSubtitle,
      relatedButton: (productPage.relatedButton as string) || DEFAULTS.productPage.relatedButton,
    },
    cartPage: {
      loadingText: (cartPage.loadingText as string) || DEFAULTS.cartPage.loadingText,
      emptyTitle: (cartPage.emptyTitle as string) || DEFAULTS.cartPage.emptyTitle,
      emptyBody: (cartPage.emptyBody as string) || DEFAULTS.cartPage.emptyBody,
      pageTitle: (cartPage.pageTitle as string) || DEFAULTS.cartPage.pageTitle,
      continueShoppingLabel:
        (cartPage.continueShoppingLabel as string) || DEFAULTS.cartPage.continueShoppingLabel,
      browseProductsLabel: (cartPage.browseProductsLabel as string) || DEFAULTS.cartPage.browseProductsLabel,
    },
    checkoutPage: {
      pageTitle: (checkoutPage.pageTitle as string) || DEFAULTS.checkoutPage.pageTitle,
      pageSubtitle: (checkoutPage.pageSubtitle as string) || DEFAULTS.checkoutPage.pageSubtitle,
      termsLabel: (checkoutPage.termsLabel as string) || DEFAULTS.checkoutPage.termsLabel,
      cartEmptyTitle: (checkoutPage.cartEmptyTitle as string) || DEFAULTS.checkoutPage.cartEmptyTitle,
      cartEmptyBody: (checkoutPage.cartEmptyBody as string) || DEFAULTS.checkoutPage.cartEmptyBody,
      continueShoppingButton:
        (checkoutPage.continueShoppingButton as string) || DEFAULTS.checkoutPage.continueShoppingButton,
    },
    blog: {
      listIntroTitle: (blog.listIntroTitle as string) || DEFAULTS.blog.listIntroTitle,
      listIntroBody: (blog.listIntroBody as string) || DEFAULTS.blog.listIntroBody,
      posts: mergeBlogPosts(blog.posts),
    },
    siteTagline:
      (content.siteDescription as string) ||
      (typeof general.companyName === "string" && general.companyName
        ? `Leading provider of sustainable energy solutions — ${general.companyName}`
        : DEFAULTS.siteTagline),
    footerCopyright: (footer.copyrightText as string) || defaultCopyright,
  }
}
