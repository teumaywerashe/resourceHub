import React, { useContext, useEffect, useState } from "react";
import { Plus, Trash2, FileText, FileImage, File, BookOpen, Search, Filter, Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/store";
import axios from "axios";
import toast from "react-hot-toast";
import "./Resource.css";

const TYPE_COLORS = {
  reference: "bg-blue-100 text-blue-700",
  exam: "bg-red-100 text-red-700",
  module: "bg-green-100 text-green-700",
  other: "bg-gray-100 text-gray-600",
};

const FILE_ICONS = {
  pdf: <FileText size={28} className="text-red-500" />,
  doc: <FileText size={28} className="text-blue-500" />,
  ppt: <FileText size={28} className="text-orange-500" />,
  image: <FileImage size={28} className="text-purple-500" />,
  video: <File size={28} className="text-pink-500" />,
  other: <BookOpen size={28} className="text-gray-500" />,
};

function Resource() {
  const { getResources, resources, url, adminToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    getResources();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource?")) return;
    setDeleting(id);
    try {
      const res = await axios.delete(`${url}/api/resources/delete/${id}`, {
        headers: { adminToken },
      });
      if (res.data.success) {
        toast.success("Resource deleted");
        getResources();
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error("Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  const filtered = resources?.filter((r) => {
    const matchSearch =
      r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.description?.toLowerCase().includes(search.toLowerCase()) ||
      r.departName?.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || r.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="resource-page">
      {/* Header */}
      <div className="resource-header">
        <div>
          <h1 className="resource-title">Resource Hub</h1>
          <p className="resource-subtitle">{resources?.length || 0} resources available</p>
        </div>
        <button className="add-resource-btn" onClick={() => navigate("/adminHome/addResource")}>
          <Plus size={16} />
          Upload Resource
        </button>
      </div>

      {/* Filters */}
      <div className="resource-filters">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          {["all", "reference", "exam", "module", "other"].map((t) => (
            <button
              key={t}
              className={`filter-tab ${filterType === t ? "active" : ""}`}
              onClick={() => setFilterType(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered?.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={48} className="empty-icon" />
          <p>No resources found</p>
          <span>Upload your first resource to get started</span>
        </div>
      ) : (
        <div className="resource-grid">
          {filtered.map((res) => (
            <div key={res._id} className="resource-card">
              <div className="card-icon-area">
                {FILE_ICONS[res.fileType] || FILE_ICONS.other}
                <span className={`type-badge ${TYPE_COLORS[res.type] || TYPE_COLORS.other}`}>
                  {res.type}
                </span>
              </div>
              <div className="card-body">
                <h3 className="card-title">{res.title || "Untitled"}</h3>
                <p className="card-desc">{res.description || "No description"}</p>
                {res.departName && (
                  <span className="card-dept">{res.departName}</span>
                )}
              </div>
              <div className="card-footer">
                <a
                  href={`${url}/uploads/resources/${res.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="view-btn"
                >
                  <Eye size={14} /> View
                </a>
                <a
                  href={`${url}/uploads/resources/${res.file}`}
                  download
                  className="download-btn"
                >
                  <Download size={14} /> Download
                </a>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(res._id)}
                  disabled={deleting === res._id}
                >
                  <Trash2 size={14} />
                  {deleting === res._id ? "..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Resource;
