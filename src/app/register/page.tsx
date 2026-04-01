"use client";

import { useState } from "react";
import Link from "next/link";
import { BrainIcon, BookIcon, BuildingIcon, ShieldIcon } from "@/components/Icons";

const roles = [
  { id: "student", label: "Student", Icon: BookIcon },
  { id: "institution", label: "Institution", Icon: BuildingIcon },
  { id: "administrator", label: "Administrator", Icon: ShieldIcon },
] as const;

type Role = (typeof roles)[number]["id"];

const medicalSchools = [
  "Harvard Medical School",
  "Johns Hopkins School of Medicine",
  "Stanford University School of Medicine",
  "University of California, San Francisco",
  "Mayo Clinic Alix School of Medicine",
  "University of Pennsylvania - Perelman",
  "Columbia University Vagelos College",
  "Washington University in St. Louis",
  "Other",
];

export default function RegisterPage() {
  const [role, setRole] = useState<Role>("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [medicalSchool, setMedicalSchool] = useState("");
  const [institutionName, setInstitutionName] = useState("");

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative blur circles */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] rounded-full bg-primary-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full bg-secondary-500/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 mb-2">
              <BrainIcon className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold gradient-text">MedLearn</span>
            </div>
            <p className="text-sm text-gray-500">Medical Education Platform</p>
          </div>

          {/* Role selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I am a...
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRole(id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    role === id
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Conditional fields */}
            {role === "student" && (
              <div>
                <label
                  htmlFor="medicalSchool"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Medical School
                </label>
                <select
                  id="medicalSchool"
                  value={medicalSchool}
                  onChange={(e) => setMedicalSchool(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white"
                >
                  <option value="">Select your medical school</option>
                  {medicalSchools.map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {role === "institution" && (
              <div>
                <label
                  htmlFor="institutionName"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Institution Name
                </label>
                <input
                  id="institutionName"
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  placeholder="Name of your institution"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="gradient-btn w-full justify-center"
            >
              Create Account
            </button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
