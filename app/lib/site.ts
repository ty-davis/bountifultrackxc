export interface SiteNavLink {
  label: string
  href: string
  disabled?: boolean
  mobileOnly?: boolean
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
    { label: 'Anything', href: '/anything', disabled: true, mobileOnly: true }
  ] satisfies SiteNavLink[]
} as const
