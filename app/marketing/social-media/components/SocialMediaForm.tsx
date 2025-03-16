"use client";
import React, { useState, useEffect } from "react";
import { SocialPost } from "../../../services/socialMediaService";

// form props
export type SocialMediaFormProps = {
  onSubmit: (data: Omit<SocialPost, "id">) => void;
  initialData: Omit<SocialPost, "id">;
  isEditing: boolean;
  onCancel: () => void;
};

export default function SocialMediaForm({
  onSubmit,
  initialData,
  isEditing,
  onCancel,
}: SocialMediaFormProps) {
  const [formData, setFormData] = useState<Omit<SocialPost, "id">>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEditing) {
      setFormData({ platform: "", message: "", scheduledDateTime: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-black mb-4">
        {isEditing ? "Edit Social Post" : "Schedule New Social Post"}
      </h2>
      <div className="space-y-4">
        {/* Platform Selection */}
        <div>
          <label className="block text-black mb-1">Platform</label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md text-black"
            required>
            <option value="" disabled>
              Select platform
            </option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Twitter">Twitter</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>
        <div>
          <label className="block text-black mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md text-black"
            placeholder="Enter your message..."
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-black mb-1">Scheduled Date & Time</label>
          <input
            type="datetime-local"
            name="scheduledDateTime"
            value={formData.scheduledDateTime}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md text-black"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-800 text-white py-2 rounded-md">
            {isEditing ? "Update Post" : "Schedule Post"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-black text-white py-2 rounded-md">
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
