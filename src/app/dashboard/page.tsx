"use client";

import Sidebar from "@/components/Sidebar";
import {
  TrendUpIcon,
  BookIcon,
  ExamIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
  CheckIcon,
  TargetIcon,
  BrainIcon,
  CalendarIcon,
} from "@/components/Icons";
import { studentMetrics, exams, studyTrails, formatNumber } from "@/data/mockData";

const weeklyDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const activityDotColor: Record<string, string> = {
  exam: "bg-indigo-500",
  trail: "bg-teal-500",
  question: "bg-amber-500",
  content: "bg-gray-400",
};

function getSubjectBarColor(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 65) return "bg-yellow-500";
  return "bg-red-500";
}

export default function DashboardPage() {
  const activeTrails = studyTrails.filter((t) => t.progress < 100);
  const availableExams = exams.filter((e) => e.status === "available");
  const maxWeekly = Math.max(...studentMetrics.weeklyProgress);

  return (
    <>
      <Sidebar />
      <div className="page-container">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="page-title">Welcome back, Lucas!</h1>
              <p className="page-subtitle flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 0c0 4 1.5 7 4 9.5S12 22 12 22s-3.5-8-1-10.5S12 2 12 2z"
                  fill="#F59E0B"
                  stroke="#D97706"
                  strokeWidth="0.5"
                />
              </svg>
              15 day streak
            </div>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Questions Answered</span>
              <TargetIcon className="w-5 h-5 text-primary-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(studentMetrics.totalQuestions)}</p>
            <p className="text-xs text-gray-500 mt-1">Accuracy: <span className="text-green-600 font-semibold">{studentMetrics.accuracy}%</span></p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Study Hours</span>
              <ClockIcon className="w-5 h-5 text-secondary-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(studentMetrics.studyHours)}</p>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <TrendUpIcon className="w-3.5 h-3.5 text-green-500" />
              <span className="text-green-600 font-semibold">+12% this week</span>
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Exams Completed</span>
              <ExamIcon className="w-5 h-5 text-accent-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{studentMetrics.examsCompleted}</p>
            <p className="text-xs text-gray-500 mt-1">Avg Score: <span className="text-primary-600 font-semibold">{studentMetrics.avgScore}%</span></p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rank</span>
              <StarIcon className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">#{studentMetrics.rank}</p>
            <p className="text-xs text-gray-500 mt-1">of {formatNumber(studentMetrics.totalStudents)} students</p>
          </div>
        </div>

        {/* Weekly Progress Chart + Subject Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Progress Chart */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Weekly Progress</h2>
            <div className="flex items-end justify-between gap-3 h-48">
              {studentMetrics.weeklyProgress.map((value, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-medium text-gray-600">{value}%</span>
                  <div className="w-full flex justify-center">
                    <div
                      className="w-10 rounded-t-lg bg-gradient-primary transition-all duration-500"
                      style={{ height: `${(value / maxWeekly) * 160}px` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{weeklyDays[idx]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Performance */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Subject Performance</h2>
            <div className="space-y-3">
              {studentMetrics.subjectPerformance.map((sp) => (
                <div key={sp.subject}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700">{sp.subject}</span>
                    <span className="text-xs font-semibold text-gray-600">{sp.score}/{sp.total}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getSubjectBarColor(sp.score)}`}
                      style={{ width: `${sp.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Study Trails */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Study Trails</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeTrails.map((trail) => (
              <div key={trail.id} className="card p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight">{trail.title}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 whitespace-nowrap ml-2">
                    {trail.subject}
                  </span>
                </div>
                <div className="progress-bar mb-2">
                  <div className="progress-fill" style={{ width: `${trail.progress}%` }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {trail.completedModules}/{trail.totalModules} modules completed
                  </span>
                  <a
                    href={`/trails/${trail.id}`}
                    className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                  >
                    Continue
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Exams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {availableExams.map((exam) => (
              <div key={exam.id} className="card p-5 flex flex-col">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{exam.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{exam.subject}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>{exam.questionCount} questions</span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5" />
                    {exam.duration} min
                  </span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span
                    className={
                      exam.difficulty === "easy"
                        ? "badge-easy"
                        : exam.difficulty === "medium"
                        ? "badge-medium"
                        : "badge-hard"
                    }
                  >
                    {exam.difficulty}
                  </span>
                  <a href={`/exams/${exam.id}`} className="gradient-btn-sm">
                    Start Exam
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity + AI Recommendation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity Feed */}
          <div className="lg:col-span-2 card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Recent Activity</h2>
            <div className="space-y-4">
              {studentMetrics.recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${activityDotColor[activity.type] || "bg-gray-400"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation Card */}
          <div className="card bg-gradient-dark p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <BrainIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-white">AI Study Suggestion</h2>
            </div>
            <p className="text-sm text-white/80 leading-relaxed flex-1">
              Based on your performance data, we recommend focusing on <span className="text-white font-semibold">Neurology</span> — your lowest subject score at <span className="text-accent-400 font-semibold">60%</span>. Strengthening this area will significantly improve your overall readiness.
            </p>
            <div className="mt-5">
              <a href="/trails/2" className="gradient-btn-sm">
                Start Neurology Trail
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
