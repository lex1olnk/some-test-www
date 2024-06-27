"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/public/logo.png";
import TeamsIcon from "@/icons/teams.svg";
import CatalogIcon from "@/icons/catalog.svg";
import FaqIcon from "@/icons/faq.svg";
import SearchIcon from "@/icons/search.png";
import { useCallback, useEffect, useState } from "react";
import { SearchSection } from "./SearchSection";
import { usePathname, useRouter } from "next/navigation";

const navs = [
  {
    src: "/catalog",
    icon: CatalogIcon,
    name: "Каталог",
  },
  {
    src: "/teams",
    icon: TeamsIcon,
    name: "Команды",
  },
  {
    src: "/faq",
    icon: FaqIcon,
    name: "FAQ",
  },
];

export const Navbar = () => {
  const { data: session } = useSession();
  const path = usePathname();
  const [show, setShow] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setShow((currentValue) => {
      return !currentValue;
    });
  }, []);

  useEffect(() => {
    setShow(false);
  }, [path]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "16px";
      document.body.style.scrollBehavior = "none";
    } else {
      document.body.style.overflow = "visible";
      document.body.style.paddingRight = "0";
      document.body.style.scrollBehavior = "auto";
    }
  }, [show]);

  return (
    <>
      <SearchSection handleClick={handleClick} show={show} />
      <nav className="flex items-center justify-between flex-wrap bg-white text-black px-8 py-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <Link className="font-semibold text-xl tracking-tight" href="/">
            <Image src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="text-sm flex-row flex">
          {navs.map((nav) => (
            <Link
              key={nav.name}
              href={nav.src}
              className="mx-4 first:ml-0 last:mr-0 mt-4 lg:mt-0 flex flex-row"
            >
              <Image src={nav.icon} alt={nav.name} />
              <p className="my-auto ml-2">{nav.name}</p>
            </Link>
          ))}
          <button className="mx-4 flex-row flex" onClick={handleClick}>
            <p className="my-auto mr-2">Поиск</p>
            <Image src={SearchIcon} alt="searchIcon" className="my-auto" />
          </button>
        </div>
        <div>
          {session ? (
            <>
              {" "}
              <span>{session?.user?.name}</span>{" "}
              <button
                onClick={() => signOut({ callbackUrl: "/", redirect: true })}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <a
                href="/register"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Зарегистрироваться
              </a>
              <a
                href="/signIn"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Войти
              </a>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
