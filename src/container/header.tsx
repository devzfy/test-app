import { FoldHorizontal, Sun, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ui/themeProvider';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

type Theme = 'dark' | 'light' | 'system';

const Header = () => {
  const { setTheme, toggleClass, removeToken } = useTheme();

  const handleLogOut = () => {
    removeToken();
  };

  return (
    <div className="header w-full border-b-2 p-3 h-16 flex justify-between">
      <Button onClick={toggleClass} variant="outline" className="p-2 border-2 rounded-lg">
        <FoldHorizontal />
      </Button>
      <div className="login flex gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-2 p-2 w-10 h-10">
              <Sun className="w-7 h-7" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52" align="end">
            <DropdownMenuRadioGroup onValueChange={(value: string) => setTheme(value as Theme)}>
              <DropdownMenuRadioItem value="light" className="cursor-pointer font-600 text-lg">
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark" className="cursor-pointer font-600 text-lg">
                Dark
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system" className="cursor-pointer font-600 text-lg">
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-2 p-2 w-10 h-10">
              <User className="w-7 h-7" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52" align="end">
            <DropdownMenuRadioGroup>
              <DropdownMenuItem className="cursor-pointer font-600 text-lg gap-2">
                <User />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogOut} className="cursor-pointer font-600 text-lg gap-2">
                <LogOut />
                Chiqish
              </DropdownMenuItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
