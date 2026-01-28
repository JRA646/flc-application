import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { menuItems } from "../config/navigation";
import type { MenuItem } from "../config/navigation";

export default function Sidebar() {
  const location = useLocation();

  // allow multiple menus open
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* LOGO */}
      <div className="p-6 border-b border-gray-200 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-200">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-white"
            >
              <path d="M10 9h4" />
              <path d="M12 7v5" />
              <path d="M14 22v-4a2 2 0 0 0-4 0v4" />
              <path d="M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22" />
              <path d="m18 7 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7" />
            </svg>
          </div>

          <div>
            <h1 className="font-bold text-xl text-gray-900">
              ChurchTrack
            </h1>
            <p className="text-xs text-gray-500">
              Attendance Monitoring
            </p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="px-2 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            level={0}
            openMenus={openMenus}
            toggleMenu={toggleMenu}
            currentPath={location.pathname}
          />
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="mt-auto p-4 border-t border-gray-200">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
                     text-rose-600 font-medium hover:bg-rose-50 transition"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="M16 17l5-5-5-5" />
            <path d="M21 12H9" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

/* =====================================
   RECURSIVE SIDEBAR ITEM
===================================== */

function SidebarItem({
  item,
  level,
  openMenus,
  toggleMenu,
  currentPath,
}: {
  item: MenuItem;
  level: number;
  openMenus: Set<string>;
  toggleMenu: (label: string) => void;
  currentPath: string;
}) {
  const hasChildren = !!item.children?.length;

  const isActive =
    item.path === currentPath ||
    item.children?.some(
      (child) =>
        child.path === currentPath ||
        child.children?.some(
          (sub) => sub.path === currentPath
        )
    );

  const isOpen = openMenus.has(item.label) || isActive;
  const paddingLeft = 16 + level * 16;

  /* ---------- ITEM WITH CHILDREN ---------- */
  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => toggleMenu(item.label)}
          className={`w-full flex items-center gap-3 py-2 rounded-lg transition cursor-pointer
            ${
              isOpen
                ? "bg-indigo-50 text-indigo-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          style={{ paddingLeft }}
        >
          {item.icon && (
            <item.icon className="w-5 h-5 shrink-0" />
          )}

          <span className="flex-1 text-left">{item.label}</span>

          {/* ARROW (RIGHT SPACING FIXED) */}
          <span
            className={`ml-auto mr-2 transition-transform duration-300 ease-in-out
              ${isOpen ? "rotate-90" : "rotate-0"}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </button>

        {/* CHILDREN — AUTO HEIGHT + HIDDEN WHEN CLOSED */}
        <div
          className={`
            ${isOpen ? "grid" : "hidden"}
            overflow-hidden
            transition-[grid-template-rows,opacity,transform]
            duration-300 ease-in-out
            motion-reduce:transition-none
            ${
              isOpen
                ? "grid-rows-[1fr] opacity-100 translate-y-0"
                : ""
            }
          `}
        >
          <div>
            {item.children!.map((child) => (
              <SidebarItem
                key={child.label}
                item={child}
                level={level + 1}
                openMenus={openMenus}
                toggleMenu={toggleMenu}
                currentPath={currentPath}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ---------- LEAF ITEM ---------- */
  return (
    <NavLink
      to={item.path!}
      className={({ isActive }) =>
        `flex items-center gap-3 py-2 rounded-lg transition
         ${
           isActive
             ? "bg-indigo-100 text-indigo-700 font-medium"
             : "text-gray-600 hover:bg-gray-100"
         }`
      }
      style={{ paddingLeft }}
    >
      {item.icon && (
        <item.icon className="w-5 h-5 shrink-0" />
      )}
      <span>{item.label}</span>
    </NavLink>
  );
}
