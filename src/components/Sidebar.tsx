"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardIcon, QuestionIcon, ExamIcon, TrailIcon,
  LibraryIcon, ChartIcon, BellIcon, LogoutIcon, BrainIcon,
} from "./Icons";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { label: "Question Bank", href: "/questions", icon: QuestionIcon },
  { label: "Exams", href: "/exams", icon: ExamIcon },
  { label: "Study Trails", href: "/trails", icon: TrailIcon },
  { label: "Content Library", href: "/library", icon: LibraryIcon },
  { label: "Analytics", href: "/analytics", icon: ChartIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-sidebar flex flex-col z-50">
      <div className="px-6 py-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <BrainIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-lg tracking-tight">MedLearn</span>
            <span className="block text-white/50 text-[10px] tracking-widest uppercase">Medical Education</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 mt-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "sidebar-link-active" : "sidebar-link"}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-4 space-y-1">
        <button className="sidebar-link w-full">
          <BellIcon className="w-5 h-5" />
          <span>Notifications</span>
          <span className="ml-auto bg-accent-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">5</span>
        </button>
        <Link href="/login" className="sidebar-link w-full">
          <LogoutIcon className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </div>

      <div className="px-4 pb-6">
        <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-bold">
            LS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Lucas Silva</p>
            <p className="text-white/50 text-xs">Student</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
