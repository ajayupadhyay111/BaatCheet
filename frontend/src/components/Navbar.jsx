import { dummyUser } from "@/constant/dummy";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Home,
  Users,
  MessageSquare,
  Bell,
  LogOut,
  Settings,
  User,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/store/features/authSlice";

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const navLinks = [
    {
      to: "/",
      icon: Home,
      label: "Home",
    },
    {
      to: "/feed",
      icon: Users,
      label: "Feed",
    },
    {
      to: "/chat",
      icon: MessageSquare,
      label: "Chats",
    },
    {
      to: "/notifications",
      icon: Bell,
      label: "Notifications",
    },
  ];

  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    if (window.innerWidth > 1020) setShowSearchBar(false);
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser())
    navigate("/login");
  };
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex justify-between items-center px-4 mt-2 h-16">
        {/* Logo and Search */}
        <div className="flex items-center  gap-4">
          <img
            loading="lazy"
            src="/logo.png"
            alt="logo"
            className="h-8 w-28 hidden sm:block"
          />
          <img
            loading="lazy"
            src="/logo2.png"
            alt="logo"
            className="size-10 sm:hidden block"
          />
          <div className="relative hidden lg:flex items-center">
            <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              className="w-[250px] pl-8 md:w-[300px]"
            />
          </div>
        </div>

        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden w-fit "
          onClick={() => setShowSearchBar((prev) => !prev)}
        >
          {showSearchBar ? (
            <X className="size-5" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>

        {/* Navigation Links */}
        <div className="flex items-center justify-around gap-3.5">
          {showSearchBar ? (
            <div className="relative flex lg:hidden items-center">
              <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                className="w-[220px] pl-8 md:w-[427px]"
              />
            </div>
          ) : (
            navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors md:flex-row md:gap-2",
                    isActive && "text-foreground font-medium"
                  )
                }
              >
                <link.icon className="h-5 w-5" />
                <span className="text-xs md:text-sm hidden md:block">
                  {link.label}
                </span>
              </NavLink>
            ))
          )}
        </div>
        <div className=" md:block hidden"></div>
        {/* User Profile */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center">
              <img
                loading="lazy"
                src={userInfo.avatar}
                alt="Profile"
                className="size-10 rounded-full ring-2 ring-primary/10 md:size-10"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => navigate(`/user/${userInfo._id}`)}
              >
                <User />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logout}>
              <LogOut />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
