/**
 * Site-wide profile data: name, navigation, contacts.
 * Edit this file to personalize the portfolio.
 */

export type SocialIcon = 'telegram' | 'email' | 'github' | 'gitlab' | 'linkedin'

export interface NavItem {
  label: string
  /** Section id on the home page. */
  sectionId: string
}

export interface ContactLink {
  icon: SocialIcon
  label: string
  href: string
}

export const site = {
  author: 'Yurii Kapustin',
  brand: 'markup.lab',
  role: 'Frontend Markup Lead',
  title: 'Frontend Markup Lead & Frontend Developer',
  location: 'Valencia, Spain',
  locale: 'en-US',

  nav: [
    { label: 'Home', sectionId: 'home' },
    { label: 'Experience', sectionId: 'experience' },
    { label: 'Skills', sectionId: 'skills' },
    { label: 'Portfolio', sectionId: 'portfolio' },
    { label: 'Blog', sectionId: 'blog' },
    { label: 'Contact', sectionId: 'contact' },
  ] satisfies NavItem[],

  contacts: [
    { icon: 'email', label: 'yuri.zieit@gmail.com', href: 'mailto:yuri.zieit@gmail.com' },
    { icon: 'linkedin', label: 'linkedin.com/in/yurii-kapustin', href: 'https://www.linkedin.com/in/yurii-kapustin' },
  ] satisfies ContactLink[],

  /** Path inside /public. Leave empty to hide the download button. */
  cvUrl: '/Yurii_Kapustin.pdf' as string,
} as const
