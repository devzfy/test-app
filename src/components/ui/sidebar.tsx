import { Dices } from "lucide-react";
import { Button } from "./button";
import { mapData } from "@/assets/data";

const Sidebar = () => {
  return (
    <div className="w-full border-r-gray-300 border-r-2 min-h-screen ">
      <div className="flex items-center py-3 pl-3 border-b-2 h-16">
        <h1 className="text-2xl font-bold pr-2">UzChess</h1>
        <Dices />
      </div>
      <div className="space-y-4 py-4">
        <div className="py-2">
          {mapData.map((el, index) => {
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start mb-2.5"
              >
                {el.icon}
                <span className="font-bold text-1xl">{el.name}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
