import {
  addIcon,
  directIcon,
  homeIcon,
  logoutIcon,
  myphotosIcon,
  notificationIcon,
  profileIcon,
  settingsIcon,
} from "@/assets/icons";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { useUserAuth } from "@/context/userAuthContext";

interface ISidebarProps {}

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: homeIcon,
  },
  {
    name: "Add Photos",
    link: "/post",
    icon: addIcon,
  },
  {
    name: "My Photos",
    link: "/my_photos",
    icon: myphotosIcon,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: profileIcon,
  },
  {
    name: "Notifications",
    link: "#",
    icon: notificationIcon,
  },
  {
    name: "Direct",
    link: "#",
    icon: directIcon,
  },
  {
    name: "Setting",
    link: "#",
    icon: settingsIcon,
  },
];
const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
    const {logOut}=useUserAuth()
  const { pathname } = useLocation();
  return (
    <>
      <nav className="flex flex-col  relative h-screen max-w-sm w-full">
        <div className="flex justify-center m-5">
          <div className="text-white text-lg">MinglePics</div>
        </div>
        {navItems.map((item) => (
          <>
            <div
              className={cn(
                buttonVariants({ variant: "default" }),
                pathname === item.link
                  ? "bg-white text-white-800 hover:bg-white rounded-none"
                  : "hover:bg-slate-950 hover:text-white bg-transparent rounded-none",
                "justify-start"
              )}
              key={item.name}
            >
              <Link
                to={item.link}
                className={
                  pathname === item.link
                    ? "flex hover:text-black"
                    : `flex hover:text-white`
                }
              >
                <span>
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-5 h-5 mr-2"
                    style={{
                      filter: `${
                        pathname === item.link ? "invert(0)" : "invert(1)"
                      }`,
                    }}
                  />
                </span>
                <span>{item.name}</span>
              </Link>
            </div>
          </>
        ))}

        <div
          className={cn(
            buttonVariants({ variant: "default" }),
            pathname === "/login"
              ? "bg-white text-white-800 hover:bg-white rounded-none"
              : "hover:bg-slate-950 hover:text-white bg-transparent rounded-none",
            "justify-start"
          )}
        >
          <Link
            to={"/login"}
            className={
              pathname === "/login"
                ? "flex hover:text-black"
                : `flex hover:text-white`
            }
            onClick={logOut}
          >
            <span>
              <img
                src={logoutIcon}
                alt={"Logout"}
                className="w-5 h-5 mr-2"
                style={{
                  filter: `${
                    pathname === "/login" ? "invert(0)" : "invert(1)"
                  }`,
                }}
              />
            </span>
            <span>{"Logout"}</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
