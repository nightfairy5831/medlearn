"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  SearchIcon,
  FilterIcon,
  PlayIcon,
  DocumentIcon,
  BookIcon,
  DownloadIcon,
  StarIcon,
  EyeIcon,
  VideoIcon,
} from "@/components/Icons";
import { contentLibrary, subjects } from "@/data/mockData";
import Image from "next/image";

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedType, setSelectedType] = useState<
    "all" | "video" | "pdf" | "article" | "presentation"
  >("all");

  const filteredContent = contentLibrary.filter((item) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !item.title.toLowerCase().includes(query) &&
        !item.description.toLowerCase().includes(query) &&
        !item.author.toLowerCase().includes(query)
      )
        return false;
    }
    if (selectedSubject && item.subject !== selectedSubject) return false;
    if (selectedType !== "all" && item.type !== selectedType) return false;
    return true;
  });

  const videoCount = contentLibrary.filter((i) => i.type === "video").length;
  const pdfCount = contentLibrary.filter((i) => i.type === "pdf").length;
  const articleCount = contentLibrary.filter((i) => i.type === "article").length;

  const typeBadgeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-indigo-600 text-white";
      case "pdf":
        return "bg-red-600 text-white";
      case "article":
        return "bg-teal-600 text-white";
      case "presentation":
        return "bg-amber-500 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="flex min-h-screen font-poppins">
      <Sidebar />
      <div className="page-container flex-1">
        {/* Header */}
        <div className="mb-8">
          <h1 className="page-title">Content Library</h1>
          <p className="page-subtitle">Videos, PDFs, articles and presentations</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-input w-full pl-9"
            />
          </div>

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
            value={selectedType}
            onChange={(e) =>
              setSelectedType(
                e.target.value as "all" | "video" | "pdf" | "article" | "presentation"
              )
            }
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
            <option value="article">Article</option>
            <option value="presentation">Presentation</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <BookIcon className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{contentLibrary.length}</p>
              <p className="text-xs text-gray-500">Total Content</p>
            </div>
          </div>
          <div className="stat-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <VideoIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{videoCount}</p>
              <p className="text-xs text-gray-500">Videos</p>
            </div>
          </div>
          <div className="stat-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <DocumentIcon className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{pdfCount}</p>
              <p className="text-xs text-gray-500">PDFs</p>
            </div>
          </div>
          <div className="stat-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
              <BookIcon className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{articleCount}</p>
              <p className="text-xs text-gray-500">Articles</p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <div key={item.id} className="card overflow-hidden group">
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Type Badge */}
                <span
                  className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${typeBadgeColor(item.type)}`}
                >
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <StarIcon className="w-4 h-4 text-accent-500" />
                  <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                </div>

                {/* Title & Description */}
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                  {item.description}
                </p>

                {/* Author & Date */}
                <div className="text-xs text-gray-400 mb-3">
                  <span>{item.author}</span>
                  <span className="mx-2">&middot;</span>
                  <span>{item.uploadDate}</span>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <EyeIcon className="w-3.5 h-3.5" />
                      {item.views.toLocaleString()}
                    </span>
                    <span>{item.duration}</span>
                  </div>
                  <button className="gradient-btn-sm text-xs">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-16">
            <BookIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">No content matches your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
