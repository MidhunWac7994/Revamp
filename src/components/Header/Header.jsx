                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
import { Dialog, DialogTrigger, DialogContent ,DialogTitle, DialogDescription} from '../components/ui/dialog'
import { Search, User, Heart, ShoppingBag, Globe } from "lucide-react";
import { gql, useQuery } from "@apollo/client";
import AuthBlocks from '../../Pages/Auth/AuthBlocks/AuthBlock'


export default function Header() {
  const [count, setCount] = useState(2);
  const { locale } = useParams(); 
  const { data } = useQuery(TOP_MENU);

  const topMenuItems = data?.TopMenu ? JSON.parse(data.TopMenu).content : [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm flex items-center justify-between px-8 py-7">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to={`/${locale }`}>
              <img
                src="/logo.svg"
                alt="Brand Logo"
                className="h-auto w-auto cursor-pointer"
              />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList className="flex gap-2">
          {topMenuItems.map((mainMenuItem) =>
            mainMenuItem.link_type === "custom_link" &&
            mainMenuItem?.children?.content ? (
              <NavigationMenuItem key={mainMenuItem.id}>
                <NavigationMenuTrigger className="text-xl hover:text-emerald-500">
                  {mainMenuItem.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white p-4 shadow-lg rounded-md">
                  <div className="grid gap-3 min-w-[200px]">
                    {mainMenuItem.children.content.map((menuItem) => (
                      <Link
                        key={menuItem.id}
                        to={`/${locale}/${menuItem.link}`}
                        className="text-sm text-gray-700 hover:text-emerald-500 cursor-pointer p-2"
                      >
                        {menuItem.name}
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={mainMenuItem.id}>
                <Link
                  to={`/${locale}/${mainMenuItem.link}`}
                  className={`text-xl py-2 px-3 cursor-pointer text-gray-700 hover:text-emerald-500 ${
                    mainMenuItem.name === "Sale" ? "text-emerald-500" : ""
                  }`}
                >
                  {mainMenuItem.name}
                </Link>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-4">
        <Globe className="h-5 w-5 text-gray-700" />
        <Search className="h-5 w-5 text-gray-700" />
        <Dialog>
          <DialogTrigger asChild>
            <User className="h-5 w-5 text-gray-700 cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle></DialogTitle> <DialogDescription></DialogDescription>
            <AuthBlocks />
          </DialogContent>
        </Dialog>

        <Heart className="h-5 w-5 text-gray-700" />
        <div className="relative">
          <ShoppingBag className="h-5 w-5 text-gray-700" />
          <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {count}
          </span>
        </div>
      </div>
    </header>
  );
}

const TOP_MENU = gql`
  query GetTopMenu {
    TopMenu
  }
`;  
  