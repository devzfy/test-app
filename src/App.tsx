import { Routes, Route } from 'react-router-dom';

import Auth from './pages/auth/auth';
import Home from './pages/home/home';
import Header from './container/header';
import Course from './pages/course/course';
import Sidebar from './components/ui/sidebar';
import { useTheme } from './components/ui/themeProvider';


function App() {
  const { token } = useTheme();

  if (!token) return <Auth />;

  return (
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
  );
}

export default App;
