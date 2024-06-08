import { FoldHorizontal, Sun, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/themeProvider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const {setTheme, toggleClass, removeToken} = useTheme("light");
  const handelLogOut = ()=>{
    removeToken()
  }
  
  

  return (
    <div>
      <div className="header w-full border-b-2  p-3 h-16 flex justify-between">
        <div className="">
          <Button onClick={toggleClass} variant="outline" className="p-2 border-2 rounded-lg">
            <FoldHorizontal />
          </Button>
        </div>
        <div className="login flex gap-3">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-2 p-2 w-[40px] h-[40px]"
                >
                  <Sun className="w-7 h-7" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]" align="end">
                <DropdownMenuRadioGroup stringoup  value={setTheme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem
                    value="light"
                    className="cursor-pointer font-600 text-lg"
                  >
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="dark"
                    className="cursor-pointer font-600 text-lg"
                  >
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="system"
                    className="cursor-pointer font-600 text-lg"
                  >
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-2 p-2 w-[40px] h-[40px]"
                >
                  <User className="w-7 h-7" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]" align="end">
                <DropdownMenuRadioGroup>
                  <DropdownMenuItem className="cursor-pointer font-600 text-lg gap-2">
                    <User />
                    Profl
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>{handelLogOut()}} className="cursor-pointer font-600 text-lg gap-2">
                    <LogOut />
                    Chiqish
                  </DropdownMenuItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
