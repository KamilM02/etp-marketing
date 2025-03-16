"use client";
import React, { useState, useEffect } from "react";
import { Campaign } from "../../../services/campaignService";

// form props
export type CampaignFormProps = {
  onSubmit: (data: Omit<Campaign, "id" | "launched">) => void;
  initialData: Omit<Campaign, "id" | "launched">;
  isEditing: boolean;
  onCancel: () => void;
};

export default function CampaignForm({
  onSubmit,
  initialData,
  isEditing,
  onCancel,
}: CampaignFormProps) {
  // Local state for the form data
  const [formData, setFormData] = useState<Omit<Campaign, "id" | "launched">>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "budget") {
      const numericValue = Number(value.replace(/\D/g, ""));
      setFormData((prev) => ({ ...prev, budget: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEditing) {
      // reset the form for new campaign creation
      setFormData({
        name: "",
        description: "",
        budget: 0,
        startDate: "",
        endDate: "",
        targetAudience: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-xl shadow-md mb-8">
      <h2 className="text-2xl font-bold text-black mb-4">
        {isEditing ? "Edit Campaign" : "New Campaign"}
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-black mb-1">Campaign Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md text-black"
            placeholder="Enter campaign name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md text-black"
            placeholder="Enter campaign description"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-black mb-1">Budget</label>
          <input
            type="text"
            name="budget"
            value={formData.budget > 0 ? `${formData.budget}` : ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md text-black"
            placeholder="Amount"
            required
          />
        </div>
        <div>
          <label className="block text-black mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md text-black"
            required
          />
        </div>
        <div>
          <label className="block text-black mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md text-black"
            required
          />
        </div>
        <div>
          <label className="block text-black mb-1">Target Audience</label>
          <input
            type="text"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md text-black"
            placeholder="e.g., Music lovers, Tech enthusiasts"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-800 text-white py-2 rounded-md">
            {isEditing ? "Update Campaign" : "Create Campaign"}
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
