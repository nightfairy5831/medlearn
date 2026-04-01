"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  TrailIcon,
  ClockIcon,
  CheckIcon,
  PlayIcon,
  BrainIcon,
  BookIcon,
  StarIcon,
  ArrowRightIcon,
  QuestionIcon,
  ExamIcon,
} from "@/components/Icons";
import { studyTrails, subjects } from "@/data/mockData";

export default function TrailsPage() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [expandedTrail, setExpandedTrail] = useState<number | null>(null);

  const filteredTrails = studyTrails.filter((trail) => {
    if (selectedSubject && trail.subject !== selectedSubject) return false;
    if (selectedDifficulty && trail.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const aiRecommendedCount = studyTrails.filter((t) => t.aiRecommended).length;

  const difficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const moduleTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayIcon className="w-4 h-4" />;
      case "reading":
        return <BookIcon className="w-4 h-4" />;
      case "quiz":
        return <QuestionIcon className="w-4 h-4" />;
      case "practice":
        return <ExamIcon className="w-4 h-4" />;
      default:
        return <BookIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex min-h-screen font-poppins">
      <Sidebar />
      <div className="page-container flex-1">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <TrailIcon className="w-7 h-7 text-primary-600" />
            <h1 className="page-title">Study Trails</h1>
          </div>
          <p className="page-subtitle">AI-powered personalized learning paths</p>
        </div>

        {/* AI Recommendation Banner */}
        <div className="bg-gradient-dark rounded-2xl p-6 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <BrainIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              AI recommends these trails based on your performance
            </p>
            <p className="text-white/60 text-xs mt-1">
              {aiRecommendedCount} trail{aiRecommendedCount !== 1 ? "s" : ""} recommended for you
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="filter-select"
          >
            <option value="">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="filter-select"
          >
            <option value="">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Trail Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTrails.map((trail) => (
            <div key={trail.id} className="card p-6">
              {/* Top Badges */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {trail.subject}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyBadge(trail.difficulty)}`}
                >
                  {trail.difficulty.charAt(0).toUpperCase() + trail.difficulty.slice(1)}
                </span>
                {trail.aiRecommended && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                    <BrainIcon className="w-3 h-3" />
                    AI Recommended
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{trail.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{trail.description}</p>

              {/* Progress Bar */}
              <div className="progress-bar mb-3">
                <div
                  className="progress-fill"
                  style={{ width: `${trail.progress}%` }}
                />
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <CheckIcon className="w-4 h-4 text-secondary-500" />
                  {trail.completedModules}/{trail.totalModules} modules
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4 text-gray-400" />
                  {trail.estimatedHours}h estimated
                </span>
                <span className="font-semibold text-primary-600">{trail.progress}%</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {trail.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Expand / Collapse Modules */}
              <button
                onClick={() =>
                  setExpandedTrail(expandedTrail === trail.id ? null : trail.id)
                }
                className="text-xs text-primary-600 font-medium hover:text-primary-700 mb-3 transition-colors"
              >
                {expandedTrail === trail.id ? "Hide Modules" : "Show Modules"}
              </button>

              {expandedTrail === trail.id && (
                <div className="border-t border-gray-100 pt-3 mb-4 space-y-2">
                  {trail.modules.map((mod) => (
                    <div
                      key={mod.id}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-gray-400">{moduleTypeIcon(mod.type)}</div>
                      <span className="flex-1 text-sm text-gray-700">{mod.title}</span>
                      <span className="text-xs text-gray-400">{mod.duration} min</span>
                      {mod.completed && (
                        <CheckIcon className="w-4 h-4 text-secondary-500" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Button */}
              <button className="gradient-btn-sm w-full justify-center">
                {trail.progress > 0 && trail.progress < 100 ? "Continue" : trail.progress === 100 ? "Review" : "Start"}
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {filteredTrails.length === 0 && (
          <div className="text-center py-16">
            <TrailIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">No study trails match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
