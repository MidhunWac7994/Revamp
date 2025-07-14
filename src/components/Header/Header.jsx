import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "../components/ui/sheet";
import { Search, User, Heart, ShoppingBag, Globe } from "lucide-react";
import { gql, useQuery } from "@apollo/client";
import AuthBlocks from "../../Pages/Auth/AuthBlocks/AuthBlock";
import CartItem from "../Cart/CartItem/CartItem";
import useCartItemsSummary from "../../CustomHook/useCartItemsSummary";
import SearchTrigger from "./SearchTrigger/SearchTrigger";

const TOP_MENU = gql`
  query GetTopMenu {
    TopMenu
  }
`;

export default function Header() {
  const [count, setCount] = useState(0);
  const { locale } = useParams();
  const location = useLocation();
  const { data } = useQuery(TOP_MENU);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);                                                                         

  const { cartItems = [], totalQuantity = 0 } = useCartItemsSummary();

  const topMenuItems = data?.TopMenu ? JSON.parse(data.TopMenu).content : [];

  useEffect(() => {
    setCount(totalQuantity);
  }, [totalQuantity]);

  const isHomePage =
    location.pathname === `/${locale}` || location.pathname === `/${locale}/`;

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [isHomePage]);

  const handleAuthDialogClose = () => {
    console.log("🔍 Header: handleAuthDialogClose called");
    setIsAuthDialogOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-7 transition-colors duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      {/* Left - Logo */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to={`/${locale}`}>
              <img
                src={isScrolled ? "/logo.svg" : "/logo-white.svg"}
                alt="Brand Logo"
                className="h-auto w-auto cursor-pointer"
              />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Main Navigation */}
      <nav className="hidden lg:flex gap-4">
        {topMenuItems.map((mainMenuItem) =>
          mainMenuItem.link_type === "custom_link" &&
          mainMenuItem?.children?.content ? (
            <Sheet key={mainMenuItem.id}>
              <SheetTrigger asChild>
                <button
                  className={`text-base font-sans font-normal cursor-pointer transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-700 hover:text-emerald-500"
                      : "text-white hover:text-emerald-300"
                  }`}
                >
                  {mainMenuItem.name}
                </button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="w-full max-w-full p-6 flex flex-col bg-white shadow-lg"
              >
                <SheetHeader>
                  <SheetTitle className="text-2xl font-semibold mb-4">
                    {mainMenuItem.name}
                  </SheetTitle>
                  <SheetClose asChild>
                    <button className="mb-4 self-end text-gray-500 hover:text-gray-900">
                      Close
                    </button>
                  </SheetClose>
                </SheetHeader>

                <div className="flex flex-col gap-3 overflow-y-auto max-h-[60vh]">
                  {mainMenuItem.children.content.map((menuItem) => (
                    <Link
                      key={menuItem.id}
                      to={`/${locale}/${menuItem.link}`}
                      className="flex gap-3 items-center p-2 hover:bg-gray-100 rounded"
                    >
                      {menuItem.image_content?.image_url && (
                        <img
                          src={menuItem.image_content.image_url}
                          alt={menuItem.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{menuItem.name}</p>
                        {menuItem.image_content?.text && (
                          <p className="text-sm text-gray-600">
                            {menuItem.image_content.text}
                          </p>
                        )}
                        {menuItem.image_content?.subtext && (
                          <p className="text-xs text-gray-400">
                            {menuItem.image_content.subtext}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Link
              key={mainMenuItem.id}
              to={`/${locale}/${mainMenuItem.link}`}
              className={`text-base font-sans font-normal py-2 px-3 cursor-pointer transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:text-emerald-500"
                  : "text-white hover:text-emerald-300"
              } ${
                mainMenuItem.name === "Sale" &&
                (isScrolled ? "text-emerald-500" : "text-emerald-300")
              }`}
            >
              {mainMenuItem.name}
            </Link>
          )
        )}
      </nav>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        <Globe
          className={`h-5 w-5 transition-colors duration-300 ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}
        />

        <SearchTrigger>
          <Search
            className={`h-5 w-5 cursor-pointer transition-colors duration-300 ${
              isScrolled ? "text-gray-700" : "text-gray-300"
            }`}
          />
        </SearchTrigger>

        <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
          <DialogTrigger asChild>
            <User
              className={`h-5 w-5 cursor-pointer transition-colors duration-300 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle />
            <DialogDescription />
            <AuthBlocks onClose={handleAuthDialogClose} />
          </DialogContent>
        </Dialog>

        <Heart
          className={`h-5 w-5 transition-colors duration-300 ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}
        />

        <Sheet>
          <SheetTrigger asChild>
            <div className="relative cursor-pointer">
              <ShoppingBag
                className={`h-5 w-5 transition-colors duration-300 ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#2cb5a7] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </div>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full sm:max-w-md p-0 flex flex-col h-screen"
          >
            <div className="flex-1 flex flex-col overflow-hidden">
              <SheetHeader className="px-4 pt-6 pb-4 border-b border-gray-200">
                <SheetTitle className="text-lg font-semibold">
                  Your Cart
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                  ))
                ) : (
                  <p className="text-center text-gray-500 mt-10">
                    Your cart is empty
                  </p>
                )}
              </div>

              <div className="px-4 pb-6 pt-4 border-t border-gray-200 flex flex-col gap-3">
                <SheetClose asChild>
                  <Link
                    to={`/${locale}/cart`}
                    className="w-full text-center py-3 border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    View Cart
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to={`/${locale}/checkout`}
                    className="w-full text-center py-3 bg-[#2cb5a7] text-white rounded-none"
                  >
                    Proceed to Checkout
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
