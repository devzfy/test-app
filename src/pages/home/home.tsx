import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Sidebar from "@/components/ui/sidebar";
import Header from "@/container/header";
import Course from "../course/course";

const Home = () => {
  return (
    <div className="flex justify-items-stretch">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="w-[80%]">
        <Header />
        <div className="p-7">
            <Routes>
              <Route path="/course" element={<Course />} />
            </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
