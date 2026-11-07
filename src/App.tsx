import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '@/pages/Home'

// Strip the trailing slash so react-router matches under GitLab Pages sub-paths.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

function App() {
  return (
    <BrowserRouter basename={basename}>
      {/* Header / Footer / Layout will be added in the components phase. */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
