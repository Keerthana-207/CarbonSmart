// src/components/ProfileModal.jsx
import React, { useState } from "react";

export const ProfileModal = ({ open, onClose, onSave, profile }) => {
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    location: profile?.location || "",
    avatar: profile?.avatar || "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-96 p-6 relative">
        <h2 className="text-lg font-bold mb-4">Complete Your Profile</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-slate-300 rounded px-3 py-2"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border border-slate-300 rounded px-3 py-2"
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            value={formData.avatar}
            onChange={handleChange}
            className="border border-slate-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
