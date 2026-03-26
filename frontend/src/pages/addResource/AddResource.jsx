import React, { useContext, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { UploadCloud, FileText, X, ArrowLeft, CheckCircle } from "lucide-react";
import { StoreContext } from "../../context/store";
import "./AddResource.css";

const ACCEPTED = ".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.mp4,.txt";

function AddResource() {
  const { url, adminToken, campus } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({
    campusId: searchParams.get("id") || "",
    departName: searchParams.get("dept") || "",
    title: "",
    description: "",
    type: "",
  });

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file");
    if (!data.title.trim()) return toast.error("Title is required");
    if (!data.type) return toast.error("Please select a resource type");

    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await axios.post(`${url}/api/resources/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          adminToken,
        },
      });
      if (res.data.success) {
        toast.success("Resource uploaded successfully");
        navigate("/adminHome/resources");
      } else {
        toast.error(res.data.msg || "Upload failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="add-resource-page">
      <div className="add-resource-container">
        {/* Header */}
        <div className="ar-header">
          <button className="back-btn" onClick={() => navigate("/adminHome/resources")}>
            <ArrowLeft size={16} /> Back
          </button>
          <div>
            <h1>Upload Resource</h1>
            <p>Share educational materials with students</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="ar-form">
          {/* File Drop Zone */}
          <div
            className={`drop-zone ${dragging ? "dragging" : ""} ${file ? "has-file" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleFileDrop}
            onClick={() => !file && document.getElementById("fileInput").click()}
          >
            {file ? (
              <div className="file-preview">
                <FileText size={32} className="text-indigo-500" />
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{formatSize(file.size)}</span>
                </div>
                <button
                  type="button"
                  className="remove-file"
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="drop-prompt">
                <UploadCloud size={40} className="upload-icon" />
                <p>Drag & drop your file here</p>
                <span>or click to browse</span>
                <small>PDF, DOC, PPT, Images, Videos up to 50MB</small>
              </div>
            )}
          </div>
          <input
            id="fileInput"
            type="file"
            accept={ACCEPTED}
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          {/* Form Fields */}
          <div className="ar-fields">
            <div className="field-group">
              <label>Title <span>*</span></label>
              <input
                name="title"
                value={data.title}
                onChange={handleChange}
                placeholder="e.g. Introduction to Calculus - Chapter 1"
                required
              />
            </div>

            <div className="field-group">
              <label>Description</label>
              <textarea
                name="description"
                value={data.description}
                onChange={handleChange}
                placeholder="Brief description of this resource..."
                rows={3}
              />
            </div>

            <div className="field-row">
              <div className="field-group">
                <label>Resource Type <span>*</span></label>
                <select name="type" value={data.type} onChange={handleChange} required>
                  <option value="">Select type</option>
                  <option value="reference">Reference Material</option>
                  <option value="exam">Past Exam</option>
                  <option value="module">Module / Lecture</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="field-group">
                <label>Campus</label>
                <select name="campusId" value={data.campusId} onChange={handleChange}>
                  <option value="">All Campuses</option>
                  {campus?.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field-group">
              <label>Department</label>
              <input
                name="departName"
                value={data.departName}
                onChange={handleChange}
                placeholder="e.g. Computer Science, Engineering..."
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={uploading}>
            {uploading ? (
              <span className="uploading-text">
                <span className="spinner" /> Uploading...
              </span>
            ) : (
              <>
                <CheckCircle size={16} /> Upload Resource
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddResource;
