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
          <Header/>
          <div className="p-7">
          <Course/>
          </div>
      </div>
    </div>
  );
};

export default Home;
