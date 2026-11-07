import { Outlet } from 'react-router-dom'
import { ScrollProgress } from '@/components/animated/ScrollProgress'
import { Footer } from '@/components/common/Footer'
import { Header } from '@/components/common/Header'
import { ScrollToHash } from '@/components/common/ScrollToHash'
import { SkipLink } from '@/components/common/SkipLink'
import { bem } from '@/utils/bem'
import styles from './Layout.module.scss'

const b = bem(styles, 'layout')

export function Layout() {
  return (
    <>
      <ScrollToHash />
      <SkipLink />
      <ScrollProgress />
      <Header />
      <main id="main-content" className={b('main')} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
