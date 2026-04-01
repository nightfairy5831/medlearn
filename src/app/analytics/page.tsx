"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import {
  ChartIcon,
  TrendUpIcon,
  BookIcon,
  ExamIcon,
  ClockIcon,
  TargetIcon,
  BrainIcon,
  StarIcon,
  CalendarIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import {
  studentMetrics,
  exams,
  studyTrails,
  questions,
  subjects,
  formatNumber,
} from "@/data/mockData";

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const completedExams = exams.filter((e) => e.status === "completed");

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "all"
  >("week");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  const periodOptions: { label: string; value: "week" | "month" | "all" }[] = [
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "All Time", value: "all" },
  ];

  const maxWeeklyValue = Math.max(...studentMetrics.weeklyProgress);

  return (
    <>
      <Sidebar />
      <div className="page-container">
        {/* ──────────── Header ──────────── */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="page-title">Analytics &amp; Performance</h1>
            <p className="page-subtitle">
              Track your progress across all subjects
            </p>
          </div>
          <div className="flex gap-2">
            {periodOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedPeriod(opt.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedPeriod === opt.value
                    ? "bg-gradient-primary text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ──────────── Overview KPIs ──────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Total Questions */}
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <BookIcon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm text-gray-500">Total Questions</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(studentMetrics.totalQuestions)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Accuracy{" "}
              <span className="font-semibold text-primary-600">
                {studentMetrics.accuracy}%
              </span>
            </p>
          </div>

          {/* Study Hours */}
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <ClockIcon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm text-gray-500">Study Hours</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(studentMetrics.studyHours)}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendUpIcon className="w-4 h-4 text-green-500" />
              <p className="text-xs text-green-600 font-medium">
                Trending up
              </p>
            </div>
          </div>

          {/* Exams Completed */}
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <ExamIcon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm text-gray-500">Exams Completed</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {studentMetrics.examsCompleted}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Avg score{" "}
              <span className="font-semibold text-primary-600">
                {studentMetrics.avgScore}%
              </span>
            </p>
          </div>

          {/* Current Streak */}
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <TargetIcon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm text-gray-500">Current Streak</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {studentMetrics.streak} days
            </p>
            <div className="flex items-center gap-1 mt-1">
              <CalendarIcon className="w-4 h-4 text-primary-500" />
              <p className="text-xs text-gray-500">Keep it going!</p>
            </div>
          </div>
        </div>

        {/* ──────────── Performance by Subject ──────────── */}
        <div className="card p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <ChartIcon className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-bold text-gray-900">
                Performance by Subject
              </h2>
            </div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Subjects</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {studentMetrics.subjectPerformance
              .filter(
                (sp) => selectedSubject === "all" || sp.subject === selectedSubject
              )
              .map((sp) => {
                const barColor =
                  sp.score >= 80
                    ? "bg-green-500"
                    : sp.score >= 65
                    ? "bg-amber-500"
                    : "bg-red-500";
                const isHighlighted =
                  selectedSubject !== "all" && sp.subject === selectedSubject;

                return (
                  <div
                    key={sp.subject}
                    className={`rounded-lg p-3 transition-all duration-200 ${
                      isHighlighted ? "bg-primary-50 ring-1 ring-primary-200" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {sp.subject}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {sp.score}/{sp.total}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${sp.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* ──────────── Weekly Progress Chart ──────────── */}
        <div className="card p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendUpIcon className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-bold text-gray-900">Weekly Progress</h2>
          </div>

          <div className="flex items-end justify-between gap-3 h-56 px-2">
            {studentMetrics.weeklyProgress.map((value, idx) => {
              const heightPercent =
                maxWeeklyValue > 0 ? (value / maxWeeklyValue) * 100 : 0;
              return (
                <div
                  key={dayLabels[idx]}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <span className="text-xs font-semibold text-gray-700">
                    {value}
                  </span>
                  <div className="w-full flex items-end" style={{ height: "180px" }}>
                    <div
                      className="w-full bg-gradient-primary rounded-t-lg transition-all duration-500"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {dayLabels[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ──────────── Exam History ──────────── */}
        <div className="card p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <ExamIcon className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-bold text-gray-900">Exam History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Exam Title</th>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Date</th>
                  <th>Attempts</th>
                </tr>
              </thead>
              <tbody>
                {completedExams.map((exam) => {
                  const percentage =
                    exam.score !== undefined && exam.totalScore
                      ? Math.round((exam.score / exam.totalScore) * 100)
                      : 0;
                  const percentColor =
                    percentage >= 80
                      ? "text-green-600"
                      : percentage >= 65
                      ? "text-yellow-600"
                      : "text-red-600";

                  return (
                    <tr key={exam.id}>
                      <td className="font-medium">{exam.title}</td>
                      <td>{exam.subject}</td>
                      <td>
                        {exam.score}/{exam.totalScore}
                      </td>
                      <td>
                        <span className={`font-bold ${percentColor}`}>
                          {percentage}%
                        </span>
                      </td>
                      <td>{exam.completedAt}</td>
                      <td>{exam.attempts}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ──────────── Study Trail Progress ──────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <StarIcon className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-bold text-gray-900">
              Study Trail Progress
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {studyTrails.map((trail) => {
              const remainingModules =
                trail.totalModules - trail.completedModules;
              const remainingHours = Math.round(
                (remainingModules / trail.totalModules) * trail.estimatedHours
              );

              return (
                <div key={trail.id} className="card p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {trail.title}
                  </h3>

                  <div className="progress-bar mb-2">
                    <div
                      className="progress-fill"
                      style={{ width: `${trail.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {trail.completedModules}/{trail.totalModules} modules
                      completed
                    </span>
                    <span>
                      {trail.progress === 100
                        ? "Completed"
                        : `~${remainingHours}h remaining`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ──────────── AI Insights Card ──────────── */}
        <div className="bg-gradient-dark rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <BrainIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold">Your AI Study Analysis</h2>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
              <TargetIcon className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <p className="text-sm text-white/90">
                <span className="font-semibold text-white">
                  Strongest Area:
                </span>{" "}
                Microbiology (88%)
              </p>
            </div>
            <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
              <TrendUpIcon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-white/90">
                <span className="font-semibold text-white">
                  Needs Improvement:
                </span>{" "}
                Neurology (60%)
              </p>
            </div>
            <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
              <ClockIcon className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-sm text-white/90">
                <span className="font-semibold text-white">Recommended:</span>{" "}
                Focus 2 more hours/week on weak subjects
              </p>
            </div>
          </div>

          <Link href="/trails" className="gradient-btn-sm">
            View Personalized Plan
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
