"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  BuildingIcon,
  UsersIcon,
  ChartIcon,
  TrendUpIcon,
  ExamIcon,
  BookIcon,
  CalendarIcon,
  ArrowRightIcon,
  StarIcon,
  DownloadIcon,
} from "@/components/Icons";
import { studentMetrics, exams, formatNumber } from "@/data/mockData";

const periods = [
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "semester", label: "Semester" },
] as const;

const topStudents = [
  { name: "Lucas Silva", avgScore: 92.3, examsCompleted: 12, studyHours: 186, trend: "up" },
  { name: "Ana Rodrigues", avgScore: 89.7, examsCompleted: 11, studyHours: 172, trend: "up" },
  { name: "Pedro Lima", avgScore: 87.1, examsCompleted: 10, studyHours: 165, trend: "up" },
  { name: "Marina Almeida", avgScore: 85.4, examsCompleted: 12, studyHours: 158, trend: "stable" },
  { name: "Rafael Costa", avgScore: 83.8, examsCompleted: 9, studyHours: 150, trend: "up" },
  { name: "Fernanda Oliveira", avgScore: 81.2, examsCompleted: 11, studyHours: 145, trend: "down" },
  { name: "Carlos Mendes", avgScore: 79.6, examsCompleted: 8, studyHours: 138, trend: "stable" },
  { name: "Julia Ferreira", avgScore: 77.9, examsCompleted: 10, studyHours: 132, trend: "up" },
  { name: "Roberto Alves", avgScore: 76.3, examsCompleted: 7, studyHours: 125, trend: "down" },
  { name: "Beatriz Souza", avgScore: 74.8, examsCompleted: 9, studyHours: 118, trend: "stable" },
];

function getTrendIndicator(trend: string) {
  if (trend === "up") return <TrendUpIcon className="w-4 h-4 text-green-500" />;
  if (trend === "down") return <TrendUpIcon className="w-4 h-4 text-red-500 rotate-180" />;
  return <span className="inline-block w-4 h-0.5 bg-gray-400 rounded" />;
}

function getSubjectBarColor(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 65) return "bg-yellow-500";
  return "bg-red-500";
}

function getExamBarColor(avgScore: number): string {
  if (avgScore >= 70) return "bg-gradient-primary";
  if (avgScore >= 55) return "bg-gradient-to-r from-amber-500 to-orange-500";
  return "bg-gradient-to-r from-red-500 to-rose-500";
}

export default function InstitutionDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "semester">("month");
  const maxSubjectScore = Math.max(...studentMetrics.subjectPerformance.map((s) => s.total));
  const maxExamAvg = Math.max(...exams.map((e) => e.avgScore));

  return (
    <>
      <Sidebar />
      <div className="page-container">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="page-title">Institution Dashboard</h1>
              <p className="page-subtitle flex items-center gap-2">
                <BuildingIcon className="w-4 h-4" />
                Universidade de Sao Paulo - Faculdade de Medicina
              </p>
            </div>
            <button className="gradient-btn">
              <DownloadIcon className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-gray-200 mb-8 w-fit">
          {periods.map((period) => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedPeriod === period.key
                  ? "bg-gradient-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Students</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <UsersIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">342</p>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <TrendUpIcon className="w-3.5 h-3.5 text-green-500" />
              <span className="text-green-600 font-semibold">+18 this semester</span>
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active This Week</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <ChartIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">289</p>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600 font-semibold">84.5%</span> engagement rate
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Score</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <StarIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">76.5%</p>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <TrendUpIcon className="w-3.5 h-3.5 text-green-500" />
              <span className="text-green-600 font-semibold">+3.2% vs last month</span>
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Top Subject</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <BookIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">Microbiology</p>
            <p className="text-xs text-gray-500 mt-1">Highest avg score: <span className="text-primary-600 font-semibold">88%</span></p>
          </div>
        </div>

        {/* Student Performance Table */}
        <div className="card overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Student Performance Overview</h2>
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1">
                View All Students
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Avg Score</th>
                  <th>Exams Completed</th>
                  <th>Study Hours</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {topStudents.map((student, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        idx < 3 ? "bg-gradient-primary text-white" : "bg-gray-100 text-gray-600"
                      }`}>
                        {idx + 1}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {student.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`font-semibold ${
                        student.avgScore >= 85 ? "text-green-600" : student.avgScore >= 75 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {student.avgScore}%
                      </span>
                    </td>
                    <td>{student.examsCompleted}</td>
                    <td>{student.studyHours}h</td>
                    <td>{getTrendIndicator(student.trend)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subject Performance + Exam Completion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Subject Performance */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Subject Performance</h2>
            <div className="space-y-3">
              {studentMetrics.subjectPerformance.map((sp) => (
                <div key={sp.subject}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700">{sp.subject}</span>
                    <span className="text-xs font-semibold text-gray-600">{sp.score}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getSubjectBarColor(sp.score)}`}
                      style={{ width: `${(sp.score / maxSubjectScore) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Completion Rates */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Exam Completion Rates</h2>
            <div className="space-y-3">
              {exams.map((exam) => (
                <div key={exam.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700 truncate max-w-[200px]">{exam.title}</span>
                    <span className="text-xs font-semibold text-gray-600">Avg: {exam.avgScore}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getExamBarColor(exam.avgScore)}`}
                      style={{ width: `${(exam.avgScore / maxExamAvg) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
