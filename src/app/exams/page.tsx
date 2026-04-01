"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import {
  ExamIcon,
  ClockIcon,
  CheckIcon,
  PlayIcon,
  TrendUpIcon,
  FilterIcon,
  SearchIcon,
} from "@/components/Icons";
import { exams, subjects } from "@/data/mockData";

export default function ExamsPage() {
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "available" | "in_progress" | "completed"
  >("all");

  const filteredExams = exams.filter((exam) => {
    const matchesSubject =
      selectedSubject === "all" || exam.subject === selectedSubject;
    const matchesStatus =
      selectedStatus === "all" || exam.status === selectedStatus;
    return matchesSubject && matchesStatus;
  });

  const totalExams = exams.length;
  const availableExams = exams.filter((e) => e.status === "available").length;
  const completedExams = exams.filter((e) => e.status === "completed").length;
  const avgScore =
    completedExams > 0
      ? Math.round(
          exams
            .filter((e) => e.status === "completed")
            .reduce((sum, e) => sum + e.avgScore, 0) / completedExams
        )
      : 0;

  return (
    <>
      <Sidebar />
      <div className="page-container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="page-title">Exams &amp; Simulations</h1>
          <p className="page-subtitle">
            Practice with realistic exam simulations and track your progress
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <ExamIcon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalExams}</p>
                <p className="text-xs text-gray-500">Total Exams</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <PlayIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {availableExams}
                </p>
                <p className="text-xs text-gray-500">Available</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <CheckIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {completedExams}
                </p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                <TrendUpIcon className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{avgScore}%</p>
                <p className="text-xs text-gray-500">Avg Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <FilterIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(
                  e.target.value as
                    | "all"
                    | "available"
                    | "in_progress"
                    | "completed"
                )
              }
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
              <SearchIcon className="w-4 h-4" />
              <span>
                {filteredExams.length} exam
                {filteredExams.length !== 1 ? "s" : ""} found
              </span>
            </div>
          </div>
        </div>

        {/* Exam Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredExams.map((exam) => (
            <div key={exam.id} className="card p-6">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                  {exam.subject}
                </span>
                <span
                  className={
                    exam.difficulty === "easy"
                      ? "badge-easy"
                      : exam.difficulty === "medium"
                      ? "badge-medium"
                      : exam.difficulty === "hard"
                      ? "badge-hard"
                      : "badge-medium"
                  }
                >
                  {exam.difficulty === "mixed"
                    ? "Mixed"
                    : exam.difficulty.charAt(0).toUpperCase() +
                      exam.difficulty.slice(1)}
                </span>
                {exam.status === "completed" && (
                  <span className="badge-completed ml-auto">Completed</span>
                )}
                {exam.status === "in_progress" && (
                  <span className="badge-pending ml-auto">In Progress</span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-gray-900 mb-1">{exam.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{exam.description}</p>

              {/* Stats Row */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <ExamIcon className="w-4 h-4 text-gray-400" />
                  {exam.questionCount} questions
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4 text-gray-400" />
                  {exam.duration} min
                </span>
                <span className="flex items-center gap-1">
                  {exam.attempts} attempt{exam.attempts !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Avg Score Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Avg Score</span>
                  <span>{exam.avgScore}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${exam.avgScore}%` }}
                  />
                </div>
              </div>

              {/* Completed Info */}
              {exam.status === "completed" && exam.score !== undefined && (
                <div className="flex items-center justify-between text-sm mb-4 bg-green-50 rounded-lg px-3 py-2">
                  <span className="text-green-700 font-medium">
                    Score: {exam.score}/{exam.totalScore}
                  </span>
                  <span className="text-green-600 text-xs">
                    Completed {exam.completedAt}
                  </span>
                </div>
              )}

              {/* CTA Button */}
              <Link href={`/exams/${exam.id}`}>
                {exam.status === "available" && (
                  <button className="gradient-btn-sm">
                    <PlayIcon className="w-4 h-4" />
                    Start Exam
                  </button>
                )}
                {exam.status === "in_progress" && (
                  <button className="gradient-btn-sm">
                    <PlayIcon className="w-4 h-4" />
                    Continue
                  </button>
                )}
                {exam.status === "completed" && (
                  <button className="gradient-btn-sm">
                    <PlayIcon className="w-4 h-4" />
                    Retake
                  </button>
                )}
              </Link>
            </div>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <div className="card p-12 text-center">
            <ExamIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No exams found
            </h3>
            <p className="text-sm text-gray-500">
              Try adjusting your filters to find exams.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
