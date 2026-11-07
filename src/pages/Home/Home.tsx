import { BlogList } from '@/components/sections/BlogList'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { ProjectList } from '@/components/sections/ProjectList'
import { Skills } from '@/components/sections/Skills'
import { getFeaturedProjects, getLatestPosts } from '@/services/content'

export function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Skills />
      <ProjectList projects={getFeaturedProjects()} />
      <BlogList posts={getLatestPosts()} />
      <Contact />
    </>
  )
}
