import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/common/Layout'
import { ToastProvider } from '@/components/common/Toast'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'

// Strip the trailing slash so react-router matches under GitHub Pages sub-paths (/portfolio/).
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

function App() {
  return (
    <BrowserRouter basename={basename}>
      <ToastProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            {/* /portfolio, /blog and /blog/:slug come in the next phase. */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
