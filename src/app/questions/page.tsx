"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  SearchIcon,
  FilterIcon,
  BookIcon,
  CheckIcon,
  EyeIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import { questions, subjects } from "@/data/mockData";

export default function QuestionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "all" | "easy" | "medium" | "hard"
  >("all");
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Record<number, string>>(
    {}
  );

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      searchQuery === "" ||
      q.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" || q.subject === selectedSubject;
    const matchesDifficulty =
      selectedDifficulty === "all" || q.difficulty === selectedDifficulty;
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const easyCount = filteredQuestions.filter(
    (q) => q.difficulty === "easy"
  ).length;
  const mediumCount = filteredQuestions.filter(
    (q) => q.difficulty === "medium"
  ).length;
  const hardCount = filteredQuestions.filter(
    (q) => q.difficulty === "hard"
  ).length;

  const handleSelectAnswer = (questionId: number, optionLabel: string) => {
    if (selectedAnswer[questionId]) return;
    setSelectedAnswer((prev) => ({ ...prev, [questionId]: optionLabel }));
    setExpandedQuestion(questionId);
  };

  const handleRandomTen = () => {
    setSearchQuery("");
    setSelectedSubject("all");
    setSelectedDifficulty("all");
    setSelectedAnswer({});
    setExpandedQuestion(null);
  };

  return (
    <>
      <Sidebar />
      <div className="page-container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="page-title">Question Bank</h1>
          <p className="page-subtitle">
            Practice with 15,680+ medical questions
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Showing {filteredQuestions.length} of {questions.length} questions
          </p>
        </div>

        {/* Filters Bar */}
        <div className="card p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <SearchIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input w-full pl-10"
              />
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
            <select
              value={selectedDifficulty}
              onChange={(e) =>
                setSelectedDifficulty(
                  e.target.value as "all" | "easy" | "medium" | "hard"
                )
              }
              className="filter-select"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <button onClick={handleRandomTen} className="gradient-btn-sm">
              <FilterIcon className="w-4 h-4" />
              Random 10
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
              <BookIcon className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Available</p>
              <p className="text-lg font-bold text-gray-900">
                {filteredQuestions.length}
              </p>
            </div>
          </div>
          <div className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <CheckIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Easy / Medium / Hard</p>
              <p className="text-lg font-bold text-gray-900">
                {easyCount} / {mediumCount} / {hardCount}
              </p>
            </div>
          </div>
          <div className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <EyeIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Answered</p>
              <p className="text-lg font-bold text-gray-900">
                {Object.keys(selectedAnswer).length} /{" "}
                {filteredQuestions.length}
              </p>
            </div>
          </div>
        </div>

        {/* Question Cards */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const userAnswer = selectedAnswer[q.id];
            const isAnswered = userAnswer !== undefined;
            const isExpanded =
              expandedQuestion === q.id || isAnswered;

            return (
              <div key={q.id} className="card p-6">
                {/* Question Header */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-gray-500">
                    Question #{q.id}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                    {q.subject}
                  </span>
                  <span
                    className={
                      q.difficulty === "easy"
                        ? "badge-easy"
                        : q.difficulty === "medium"
                        ? "badge-medium"
                        : "badge-hard"
                    }
                  >
                    {q.difficulty.charAt(0).toUpperCase() +
                      q.difficulty.slice(1)}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {q.source} &middot; {q.year}
                  </span>
                </div>

                {/* Question Text */}
                <p className="font-medium text-gray-900 mb-4">{q.text}</p>

                {/* Options */}
                <div className="space-y-2 mb-4">
                  {q.options.map((option) => {
                    let optionClasses =
                      "w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 flex items-center gap-3 text-sm";

                    if (!isAnswered) {
                      optionClasses +=
                        " border-gray-200 hover:border-primary-300 hover:bg-primary-50/50 cursor-pointer";
                    } else if (option.label === q.correctAnswer) {
                      optionClasses +=
                        " bg-green-50 border-green-500 text-green-900";
                    } else if (
                      option.label === userAnswer &&
                      option.label !== q.correctAnswer
                    ) {
                      optionClasses +=
                        " bg-red-50 border-red-500 text-red-900";
                    } else {
                      optionClasses +=
                        " border-gray-200 text-gray-500 opacity-60";
                    }

                    return (
                      <button
                        key={option.label}
                        onClick={() =>
                          handleSelectAnswer(q.id, option.label)
                        }
                        disabled={isAnswered}
                        className={optionClasses}
                      >
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isAnswered && option.label === q.correctAnswer
                              ? "bg-green-500 text-white"
                              : isAnswered &&
                                option.label === userAnswer &&
                                option.label !== q.correctAnswer
                              ? "bg-red-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {option.label}
                        </span>
                        <span>{option.text}</span>
                        {isAnswered &&
                          option.label === q.correctAnswer && (
                            <CheckIcon className="w-5 h-5 text-green-600 ml-auto shrink-0" />
                          )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation (shown when answered / expanded) */}
                {isExpanded && (
                  <div className="bg-primary-50 border-l-4 border-primary-500 rounded-r-lg p-4 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <EyeIcon className="w-4 h-4 text-primary-600" />
                      <span className="text-sm font-semibold text-primary-700">
                        Explanation
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {q.explanation}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {q.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-primary-700 border border-primary-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredQuestions.length === 0 && (
            <div className="card p-12 text-center">
              <BookIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">
                No questions match your filters.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Try adjusting the search query or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
