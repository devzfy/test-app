import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Auth from './pages/auth/auth';
import Home from './pages/home/home';
import Header from './container/header';
import Course from './pages/course/course';
import Sidebar from './components/ui/sidebar';
import { useTheme } from './components/ui/themeProvider';

const queryClient = new QueryClient();

function App() {
  const { token } = useTheme();

  if (!token) return <Auth />;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-between">
        <Sidebar />
        <div className="w-full">
          <Header />
          <div className="p-7">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/course" element={<Course />} />
            </Routes>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
