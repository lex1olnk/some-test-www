"use client";

import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes, ReactNode, useState } from "react";

interface NavigationProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  navs: {
    content: ReactNode;
    value: string;
  }[];
}

export const Navigation = ({ children, className, navs }: NavigationProps) => {
  const [openTab, setOpenTab] = useState(1);

  const navigations = navs.map((nav, index) => {
    return {
      value: nav.value,
      href: `#link${index + 1}`,
      tab: index + 1,
      id: `link${index + 1}`,
      content: nav.content,
    };
  });

  return (
    <>
      <div className={classNames("flex flex-wrap text-black", className)}>
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {navigations.map((nav) => (
              <li
                className="-mb-px mr-2 last:mr-0 flex-auto text-center"
                key={nav.href}
              >
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === nav.tab
                      ? "text-white bg-blueGray-600"
                      : "text-blueGray-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(nav.tab);
                  }}
                  data-toggle="tab"
                  href={nav.href}
                  role="tablist"
                >
                  <i className="fas fa-space-shuttle text-base mr-1"></i>{" "}
                  {nav.value}
                </a>
              </li>
            ))}
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div
                  className={openTab ? "block" : "hidden"}
                  id={navigations[openTab - 1].id}
                >
                  {navigations[openTab - 1].content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
