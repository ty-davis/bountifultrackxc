export interface SiteNavLink {
  label: string
  href: string
  icon?: string
  disabled?: boolean
  mobileOnly?: boolean
  external?: boolean
}

export const siteConfig = {
  name: 'Bountiful · T&F / XC',
  tagline: 'Track, field, and cross country',
  description:
    'Team updates, schedules, and meet information in a simple content-driven site.',
  mobileNavDescription: 'Team links and future pages.',
  headerImage: '/assets/bountifulpano.jpg',
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Schedule', href: '/schedule', },
    { label: 'Results', href: '/results', },
    { label: 'Instagram', icon: 'mdi:instagram', href: 'https://instagram.com/bhsredhawks_xctf', external: true}
  ] satisfies SiteNavLink[]
} as const
