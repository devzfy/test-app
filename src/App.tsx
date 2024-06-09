import Auth from './pages/auth/auth'
import Home from './pages/home/home'
import { Routes, Route } from 'react-router-dom'
import Header from './container/header'
import Course from './pages/course/course'
import Sidebar from './components/ui/sidebar'
import { useTheme } from './components/ui/themeProvider'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from './components/ui/toaster'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
function App() {
  const { token } = useTheme()
  const { toast } = useToast()
  const query = new QueryClient()

  useEffect(() => {
    toast({
      title: 'Muvaffaqiyat!',
      description: 'UzChess platformasiga hush kelibsiz',
    })
  }, [])
  if (!token) return <Auth />
  return (
    <div className="flex justify-between">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        <Header />
        <QueryClientProvider client={query}>
          <div className="p-7">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/course" element={<Course />} />
            </Routes>
          </div>
        </QueryClientProvider>
      </div>
      <Toaster />
    </div>
  )
  // logical wrong
}

export default App
