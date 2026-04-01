"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ClockIcon,
  CheckIcon,
  ArrowRightIcon,
  ExamIcon,
} from "@/components/Icons";
import type { Exam, Question } from "@/data/mockData";

interface ExamSimulatorProps {
  exam: Exam;
  examQuestions: Question[];
}

export default function ExamSimulator({
  exam,
  examQuestions,
}: ExamSimulatorProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);

  useEffect(() => {
    if (showResults) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showResults]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const handleSelectAnswer = (questionIndex: number, optionLabel: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionLabel,
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const correctCount = examQuestions.reduce((count, q, index) => {
    return selectedAnswers[index] === q.correctAnswer ? count + 1 : count;
  }, 0);

  const percentage =
    examQuestions.length > 0
      ? Math.round((correctCount / examQuestions.length) * 100)
      : 0;

  const passed = percentage >= 70;

  if (showResults) {
    return (
      <div>
        {/* Score Card */}
        <div className="card p-8 mb-8 text-center">
          <div className="mb-6">
            <div
              className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 ${
                passed ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {passed ? (
                <CheckIcon className="w-10 h-10 text-green-600" />
              ) : (
                <ExamIcon className="w-10 h-10 text-red-600" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {exam.title} - Results
            </h2>
            <p className="text-sm text-gray-500">
              You&apos;ve completed the exam
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-gray-900">
                {correctCount}/{examQuestions.length}
              </p>
              <p className="text-xs text-gray-500">Correct</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-gray-900">{percentage}%</p>
              <p className="text-xs text-gray-500">Score</p>
            </div>
            <div
              className={`rounded-xl p-4 ${
                passed ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <p
                className={`text-2xl font-bold ${
                  passed ? "text-green-700" : "text-red-700"
                }`}
              >
                {passed ? "PASS" : "FAIL"}
              </p>
              <p
                className={`text-xs ${
                  passed ? "text-green-600" : "text-red-600"
                }`}
              >
                {passed ? "70% or above" : "Below 70%"}
              </p>
            </div>
          </div>

          <Link href="/exams" className="gradient-btn-sm inline-flex">
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            Back to Exams
          </Link>
        </div>

        {/* Per-Question Review */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Question Review</h3>
          {examQuestions.map((q, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === q.correctAnswer;
            return (
              <div key={q.id} className="card p-5">
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCorrect
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium text-gray-900">{q.text}</p>
                </div>

                <div className="ml-10 space-y-2">
                  {q.options.map((option) => {
                    const isSelected = userAnswer === option.label;
                    const isCorrectOption = q.correctAnswer === option.label;
                    let optionClass =
                      "border border-gray-200 bg-white text-gray-700";
                    if (isCorrectOption) {
                      optionClass =
                        "border-2 border-green-500 bg-green-50 text-green-800";
                    } else if (isSelected && !isCorrectOption) {
                      optionClass =
                        "border-2 border-red-500 bg-red-50 text-red-800";
                    }
                    return (
                      <div
                        key={option.label}
                        className={`px-4 py-2 rounded-lg text-sm ${optionClass}`}
                      >
                        <span className="font-semibold mr-2">
                          {option.label}.
                        </span>
                        {option.text}
                        {isCorrectOption && (
                          <CheckIcon className="w-4 h-4 inline-block ml-2 text-green-600" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="ml-10 mt-3 bg-blue-50 rounded-lg px-4 py-2">
                    <p className="text-xs text-blue-800">
                      <span className="font-semibold">Explanation:</span>{" "}
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Back Link */}
        <div className="mt-8 text-center">
          <Link href="/exams" className="gradient-btn-sm inline-flex">
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            Back to Exams
          </Link>
        </div>
      </div>
    );
  }

  const question = examQuestions[currentQuestion];

  return (
    <div>
      {/* Top Bar */}
      <div className="card p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ExamIcon className="w-5 h-5 text-primary-600" />
            <h2 className="font-bold text-gray-900">{exam.title}</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <ClockIcon
                className={`w-5 h-5 ${
                  timeLeft < 300 ? "text-red-500" : "text-gray-500"
                }`}
              />
              <span
                className={`font-mono font-bold ${
                  timeLeft < 300 ? "text-red-600" : "text-gray-900"
                }`}
              >
                {formattedTime}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              Question{" "}
              <span className="font-semibold text-gray-900">
                {currentQuestion + 1}
              </span>{" "}
              of {examQuestions.length}
            </span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-3">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentQuestion + 1) / examQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      {question && (
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge-medium">{question.subject}</span>
            <span
              className={
                question.difficulty === "easy"
                  ? "badge-easy"
                  : question.difficulty === "medium"
                  ? "badge-medium"
                  : "badge-hard"
              }
            >
              {question.difficulty.charAt(0).toUpperCase() +
                question.difficulty.slice(1)}
            </span>
          </div>

          <p className="text-gray-900 font-medium mb-6">{question.text}</p>

          <div className="space-y-3">
            {question.options.map((option) => {
              const isSelected =
                selectedAnswers[currentQuestion] === option.label;
              return (
                <button
                  key={option.label}
                  onClick={() =>
                    handleSelectAnswer(currentQuestion, option.label)
                  }
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm ${
                    isSelected
                      ? "border-primary-500 bg-primary-50 text-gray-900"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full mr-3 text-xs font-bold ${
                      isSelected
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {option.label}
                  </span>
                  {option.text}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            currentQuestion === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          Previous
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-all duration-200"
          >
            Submit Exam
          </button>

          {currentQuestion < examQuestions.length - 1 && (
            <button
              onClick={handleNext}
              className="gradient-btn-sm"
            >
              Next
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Question Map */}
      <div className="card p-4 mt-6">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Question Map
        </p>
        <div className="flex flex-wrap gap-2">
          {examQuestions.map((_, index) => {
            const isAnswered = selectedAnswers[index] !== undefined;
            const isCurrent = index === currentQuestion;
            return (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isCurrent
                    ? "bg-primary-500 text-white"
                    : isAnswered
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
