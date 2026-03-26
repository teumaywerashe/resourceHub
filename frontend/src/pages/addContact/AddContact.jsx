import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/store";
import axios from "axios";
import toast from "react-hot-toast";
import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Linkedin, Save } from "lucide-react";

function AddContact() {
  const { url, uniId, currentUniversity, getUniversity } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({
    address: "", phone1: "", phone2: "",
    email1: "", email2: "", website: "",
    facebook: "", twitter: "", linkedin: "",
  });

  useEffect(() => {
    if (uniId) getUniversity(uniId);
  }, [uniId]);

  useEffect(() => {
    if (currentUniversity?.contact) {
      setContact({ ...contact, ...currentUniversity.contact });
    }
  }, [currentUniversity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(`${url}/api/university/update/${uniId}`, {
        contact,
      });
      if (res.data.success) {
        toast.success("Contact info saved!");
        getUniversity(uniId);
      } else {
        toast.error(res.data.msg || "Failed to save");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ icon: Icon, label, name, placeholder, type = "text" }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
        <Icon size={14} className="text-slate-400" /> {label}
      </label>
      <input
        type={type}
        name={name}
        value={contact[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Phone size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Contact Information</h2>
            <p className="text-blue-100 text-sm">Update your university's public contact details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {/* Location */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Location</p>
            <Field icon={MapPin} label="Address" name="address" placeholder="Main Campus, Building A, Addis Ababa" />
          </div>

          {/* Phone */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Phone Numbers</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field icon={Phone} label="Primary Phone" name="phone1" placeholder="+251 911 00 00 00" />
              <Field icon={Phone} label="Secondary Phone" name="phone2" placeholder="+251 111 22 33 44" />
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Email Addresses</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field icon={Mail} label="Primary Email" name="email1" placeholder="info@university.edu.et" type="email" />
              <Field icon={Mail} label="Admissions Email" name="email2" placeholder="admissions@university.edu.et" type="email" />
            </div>
          </div>

          {/* Website */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Website</p>
            <Field icon={Globe} label="Website URL" name="website" placeholder="https://www.university.edu.et" />
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Social Media</p>
            <div className="flex flex-col gap-4">
              <Field icon={Facebook} label="Facebook" name="facebook" placeholder="https://facebook.com/university" />
              <Field icon={Twitter} label="Twitter / X" name="twitter" placeholder="https://twitter.com/university" />
              <Field icon={Linkedin} label="LinkedIn" name="linkedin" placeholder="https://linkedin.com/school/university" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-2"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
            ) : (
              <><Save size={16} /> Save Contact Info</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddContact;
