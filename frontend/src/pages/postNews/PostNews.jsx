import React, { useState, useContext, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Upload, Newspaper, Tag, AlignLeft, ImageIcon, X, Trash2, Plus } from "lucide-react";
import { StoreContext } from "../../context/store";

const CATEGORIES = [
  "Academic", "Research", "Sports", "Events", "Announcement", "Campus Life", "Other",
];

function PostNews() {
  const uniId = localStorage.getItem("uniId");
  const { url } = useContext(StoreContext);
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({ title: "", category: "", content: "" });

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${url}/api/news/get/${uniId}`);
      if (res.data.success) setNewsList(res.data.uniNews);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (uniId) fetchNews();
  }, [uniId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setData({ title: "", category: "", content: "" });
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const postNew = async (e) => {
    e.preventDefault();
    if (!image) { toast.error("Please select a news image"); return; }
    const formData = new FormData();
    formData.append("uniId", uniId);
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("content", data.content);
    formData.append("image", image);
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/news/add`, formData);
      if (response.data.success) {
        toast.success("News posted successfully!");
        resetForm();
        setShowForm(false);
        fetchNews();
      } else {
        toast.error(response.data.msg || "Failed to post news");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (id) => {
    if (!window.confirm("Delete this news article?")) return;
    try {
      const res = await axios.delete(`${url}/api/news/delete/${id}`);
      if (res.data.success) {
        toast.success("News deleted");
        setNewsList((prev) => prev.filter((n) => n._id !== id));
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">News Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">Post and manage your university news</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); resetForm(); }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          {showForm ? "Cancel" : "Post News"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center gap-3">
            <Newspaper size={20} className="text-white" />
            <h2 className="text-white font-bold">New Article</h2>
          </div>
          <form onSubmit={postNew} className="p-6 flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">News Image</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:border-blue-400 transition-colors group"
              >
                {image ? (
                  <>
                    <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-48 object-cover" />
                    <button type="button"
                      onClick={(e) => { e.stopPropagation(); setImage(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 gap-2 text-slate-400 group-hover:text-blue-500 transition-colors">
                    <Upload size={28} />
                    <span className="text-sm font-medium">Click to upload image</span>
                    <span className="text-xs">PNG, JPG, JPEG</span>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" hidden
                onChange={(e) => { const f = e.target.files[0]; if (f) setImage(f); }} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
              <input required name="title" value={data.title} onChange={handleChange}
                type="text" placeholder="Enter news title..."
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select required name="category" value={data.category} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white">
                <option value="">-- Select a category --</option>
                {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
              <textarea required name="content" value={data.content} onChange={handleChange}
                placeholder="Write the news content here..." rows={5}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-vertical" />
            </div>

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={resetForm}
                className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
                Clear
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Posting...</>
                ) : "Post News"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Published Articles ({newsList.length})</h3>
        </div>
        {newsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Newspaper size={40} className="mb-3 opacity-40" />
            <p className="text-sm">No news articles yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {newsList.map((item) => (
              <li key={item._id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <img
                  src={`${url}/uploads/news/${item.image}`}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-slate-100"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{item.title}</p>
                  <span className="inline-block mt-1 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                    {item.category}
                  </span>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{item.content}</p>
                </div>
                <button onClick={() => deleteNews(item._id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0" title="Delete">
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PostNews;
