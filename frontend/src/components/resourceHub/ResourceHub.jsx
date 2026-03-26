import React, { useContext, useEffect, useState } from "react";
import { BookOpen, FileText, FileImage, File, Download, Eye, Search, GraduationCap } from "lucide-react";
import { StoreContext } from "../../context/store";
import axios from "axios";
import "./ResourceHub.css";

const TYPE_COLORS = {
  reference: { bg: "#dbeafe", color: "#1d4ed8" },
  exam: { bg: "#fee2e2", color: "#b91c1c" },
  module: { bg: "#dcfce7", color: "#15803d" },
  other: { bg: "#f1f5f9", color: "#475569" },
};

const FILE_ICONS = {
  pdf: <FileText size={24} style={{ color: "#ef4444" }} />,
  doc: <FileText size={24} style={{ color: "#3b82f6" }} />,
  ppt: <FileText size={24} style={{ color: "#f97316" }} />,
  image: <FileImage size={24} style={{ color: "#a855f7" }} />,
  video: <File size={24} style={{ color: "#ec4899" }} />,
  other: <BookOpen size={24} style={{ color: "#64748b" }} />,
};

function ResourceHub({ uniId }) {
  const { url } = useContext(StoreContext);
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get(`${url}/api/resources/get`);
        if (res.data.success) setResources(res.data.resources);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [url]);

  const filtered = resources.filter((r) => {
    const matchSearch =
      r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.description?.toLowerCase().includes(search.toLowerCase()) ||
      r.departName?.toLowerCase().includes(search.toLowerCase());
    const matchType = activeType === "all" || r.type === activeType;
    return matchSearch && matchType;
  });

  const counts = {
    all: resources.length,
    reference: resources.filter((r) => r.type === "reference").length,
    exam: resources.filter((r) => r.type === "exam").length,
    module: resources.filter((r) => r.type === "module").length,
  };

  return (
    <section id="resource" className="rh-section">
      <div className="rh-container">
        {/* Header */}
        <div className="rh-header">
          <div className="rh-badge">
            <GraduationCap size={16} />
            Resource Hub
          </div>
          <h2 className="rh-title">
            Academic <span>Resources</span>
          </h2>
          <p className="rh-subtitle">
            Browse and download study materials, past exams, and lecture modules shared by your university.
          </p>
        </div>

        {/* Stats */}
        <div className="rh-stats">
          {[
            { label: "Total Resources", value: counts.all, color: "#4f46e5" },
            { label: "References", value: counts.reference, color: "#1d4ed8" },
            { label: "Past Exams", value: counts.exam, color: "#b91c1c" },
            { label: "Modules", value: counts.module, color: "#15803d" },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <span className="stat-value" style={{ color: s.color }}>{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="rh-controls">
          <div className="rh-search">
            <Search size={16} className="rh-search-icon" />
            <input
              type="text"
              placeholder="Search by title, department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="rh-type-tabs">
            {["all", "reference", "exam", "module", "other"].map((t) => (
              <button
                key={t}
                className={`rh-tab ${activeType === t ? "active" : ""}`}
                onClick={() => setActiveType(t)}
              >
                {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="rh-loading">
            <div className="rh-spinner" />
            <p>Loading resources...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rh-empty">
            <BookOpen size={48} />
            <p>No resources found</p>
          </div>
        ) : (
          <div className="rh-grid">
            {filtered.map((res) => {
              const typeStyle = TYPE_COLORS[res.type] || TYPE_COLORS.other;
              return (
                <div key={res._id} className="rh-card">
                  <div className="rh-card-top">
                    <div className="rh-file-icon">
                      {FILE_ICONS[res.fileType] || FILE_ICONS.other}
                    </div>
                    <span
                      className="rh-type-tag"
                      style={{ background: typeStyle.bg, color: typeStyle.color }}
                    >
                      {res.type}
                    </span>
                  </div>
                  <div className="rh-card-body">
                    <h3>{res.title || "Untitled"}</h3>
                    <p>{res.description || "No description available"}</p>
                    {res.departName && (
                      <span className="rh-dept">{res.departName}</span>
                    )}
                  </div>
                  <div className="rh-card-actions">
                    <a
                      href={`${url}/uploads/resources/${res.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rh-btn rh-view"
                    >
                      <Eye size={14} /> View
                    </a>
                    <a
                      href={`${url}/uploads/resources/${res.file}`}
                      download
                      className="rh-btn rh-download"
                    >
                      <Download size={14} /> Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default ResourceHub;
