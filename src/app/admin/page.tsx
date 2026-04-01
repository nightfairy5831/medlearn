"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  DashboardIcon,
  UsersIcon,
  BookIcon,
  ExamIcon,
  ChartIcon,
  TrendUpIcon,
  SettingsIcon,
  BellIcon,
  PlusIcon,
  CalendarIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import { adminMetrics, formatNumber, formatCurrency } from "@/data/mockData";

const monthlySignups = [
  { month: "Oct", value: 820 },
  { month: "Nov", value: 950 },
  { month: "Dec", value: 1100 },
  { month: "Jan", value: 980 },
  { month: "Feb", value: 1150 },
  { month: "Mar", value: 1240 },
];

const recentSignups = [
  { name: "Dr. Fernanda Oliveira", email: "fernanda.o@med.usp.br", role: "institution", date: "Mar 31, 2026" },
  { name: "Rafael Costa", email: "rafael.costa@gmail.com", role: "student", date: "Mar 31, 2026" },
  { name: "Marina Almeida", email: "marina.alm@unicamp.br", role: "student", date: "Mar 30, 2026" },
  { name: "Pedro Henrique Santos", email: "ph.santos@outlook.com", role: "student", date: "Mar 30, 2026" },
  { name: "Juliana Ferreira", email: "juliana.f@ufrj.br", role: "institution", date: "Mar 29, 2026" },
];

const mockUsers = [
  { name: "Lucas Silva", email: "lucas.silva@gmail.com", role: "student", status: "active", joined: "Jan 15, 2026", lastActive: "Mar 31, 2026" },
  { name: "Dr. Maria Santos", email: "maria.santos@med.usp.br", role: "institution", status: "active", joined: "Nov 20, 2025", lastActive: "Mar 31, 2026" },
  { name: "Carlos Mendes", email: "carlos.mendes@admin.medlearn.com", role: "admin", status: "active", joined: "Aug 01, 2025", lastActive: "Mar 31, 2026" },
  { name: "Ana Rodrigues", email: "ana.rodrigues@hotmail.com", role: "student", status: "active", joined: "Feb 10, 2026", lastActive: "Mar 30, 2026" },
  { name: "Roberto Alves", email: "roberto.alves@unicamp.br", role: "institution", status: "active", joined: "Dec 05, 2025", lastActive: "Mar 29, 2026" },
  { name: "Fernanda Costa", email: "fernanda.costa@gmail.com", role: "student", status: "inactive", joined: "Oct 18, 2025", lastActive: "Feb 15, 2026" },
  { name: "Pedro Lima", email: "pedro.lima@yahoo.com", role: "student", status: "active", joined: "Mar 01, 2026", lastActive: "Mar 31, 2026" },
  { name: "Julia Ferreira", email: "julia.ferreira@ufrj.br", role: "institution", status: "pending", joined: "Mar 28, 2026", lastActive: "Mar 28, 2026" },
];

const recentContent = [
  { title: "Cardiac Anatomy - 3D Visualization", type: "video", subject: "Anatomy", date: "Mar 15, 2026", views: 12450 },
  { title: "ECG Interpretation Guide", type: "pdf", subject: "Cardiology", date: "Mar 10, 2026", views: 8920 },
  { title: "Pharmacology Mechanisms Map", type: "pdf", subject: "Pharmacology", date: "Mar 05, 2026", views: 15670 },
  { title: "Pathology of Inflammation", type: "video", subject: "Pathology", date: "Feb 28, 2026", views: 9340 },
  { title: "Microbiology Review Charts", type: "presentation", subject: "Microbiology", date: "Feb 20, 2026", views: 11200 },
];

const tabs = [
  { key: "overview", label: "Overview", icon: DashboardIcon },
  { key: "users", label: "Users", icon: UsersIcon },
  { key: "content", label: "Content", icon: BookIcon },
] as const;

function getRoleBadge(role: string) {
  if (role === "admin") return "bg-purple-100 text-purple-800";
  if (role === "institution") return "bg-blue-100 text-blue-800";
  return "bg-green-100 text-green-800";
}

function getStatusBadge(status: string) {
  if (status === "active") return "bg-green-100 text-green-800";
  if (status === "pending") return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-600";
}

function getTypeBadge(type: string) {
  if (type === "video") return "bg-red-100 text-red-800";
  if (type === "pdf") return "bg-blue-100 text-blue-800";
  if (type === "article") return "bg-green-100 text-green-800";
  return "bg-purple-100 text-purple-800";
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "content">("overview");
  const maxSignup = Math.max(...monthlySignups.map((m) => m.value));

  return (
    <>
      <Sidebar />
      <div className="page-container">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="page-title">Admin Dashboard</h1>
              <p className="page-subtitle">Platform Management</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                <BellIcon className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
              </button>
              <button className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                <SettingsIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Students</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <UsersIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(adminMetrics.totalStudents)}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Students</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <TrendUpIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(adminMetrics.activeStudents)}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Institutions</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <DashboardIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{adminMetrics.totalInstitutions}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Questions</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <BookIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(adminMetrics.totalQuestions)}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Exams</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <ExamIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{adminMetrics.totalExams}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Revenue</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <ChartIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(adminMetrics.monthlyRevenue)}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-gray-200 mb-8 w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-primary text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Activity Chart + Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Monthly Signups Chart */}
              <div className="lg:col-span-2 card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Monthly Signups</h2>
                <div className="flex items-end justify-between gap-4 h-52">
                  {monthlySignups.map((m) => (
                    <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-medium text-gray-600">{formatNumber(m.value)}</span>
                      <div className="w-full flex justify-center">
                        <div
                          className="w-12 rounded-t-lg bg-gradient-primary transition-all duration-500"
                          style={{ height: `${(m.value / maxSignup) * 180}px` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{m.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card p-6 flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Quick Stats</h2>
                <div className="space-y-5 flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Avg Session Time</span>
                      <span className="text-sm font-bold text-gray-900">{adminMetrics.avgSessionTime} min</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-primary" style={{ width: "78%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">New Signups</span>
                      <span className="text-sm font-bold text-gray-900">{formatNumber(adminMetrics.newSignups)}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: "85%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Retention Rate</span>
                      <span className="text-sm font-bold text-gray-900">{adminMetrics.retentionRate}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500" style={{ width: `${adminMetrics.retentionRate}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Signups */}
            <div className="card p-6 mb-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-900">Recent Signups</h2>
                <button className="text-sm font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1">
                  View All
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {recentSignups.map((signup, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {signup.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{signup.name}</p>
                      <p className="text-xs text-gray-500 truncate">{signup.email}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(signup.role)}`}>
                      {signup.role}
                    </span>
                    <span className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {signup.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="card overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
                <button className="gradient-btn-sm">
                  <PlusIcon className="w-4 h-4" />
                  Add User
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined Date</th>
                    <th>Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="text-gray-500">{user.email}</td>
                      <td>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="text-gray-500">{user.joined}</td>
                      <td className="text-gray-500">{user.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === "content" && (
          <>
            {/* Content Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <div className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Content</span>
                  <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <BookIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(adminMetrics.totalContent)}</p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Videos</span>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                    <ChartIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">485</p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">PDFs</span>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                    <BookIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">512</p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Articles</span>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <ExamIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">283</p>
              </div>
            </div>

            {/* Upload + Recent Content */}
            <div className="card p-6 mb-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-900">Recent Content</h2>
                <button className="gradient-btn-sm">
                  <PlusIcon className="w-4 h-4" />
                  Upload Content
                </button>
              </div>
              <div className="space-y-4">
                {recentContent.map((content, idx) => (
                  <div key={idx} className="flex items-center gap-4 py-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{content.title}</p>
                      <p className="text-xs text-gray-500">{content.subject}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadge(content.type)}`}>
                      {content.type}
                    </span>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{formatNumber(content.views)} views</span>
                    <span className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {content.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
