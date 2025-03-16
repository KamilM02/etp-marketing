"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CampaignForm from "./components/CampaignForm";
import {
  Campaign,
  fetchCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from "../../services/campaignService";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };
    getCampaigns();
  }, []);

  const handleCreateCampaign = async (campaignData: Omit<Campaign, "id" | "launched">) => {
    const created = await createCampaign(campaignData);
    setCampaigns((prev) => [...prev, created]);
  };

  const handleUpdateCampaign = async (updatedData: Omit<Campaign, "id" | "launched">) => {
    if (editingCampaign) {
      const updated = await updateCampaign(editingCampaign.id, {
        ...updatedData,
        launched: editingCampaign.launched,
      });
      setCampaigns((prev) =>
        prev.map((c) => (c.id === editingCampaign.id ? updated : c))
      );
      setEditingCampaign(null);
    }
  };

  const handleDeleteCampaign = async (id: number) => {
    await deleteCampaign(id);
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  const handleLaunchCampaign = async (campaign: Campaign) => {
    const updated = await updateCampaign(campaign.id, {
      name: campaign.name,
      description: campaign.description,
      budget: campaign.budget,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      targetAudience: campaign.targetAudience,
      launched: true,
    });
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaign.id ? updated : c))
    );
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full">
      <header className="w-full bg-blue-800 text-white py-12 px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold drop-shadow-md">Campaigns</h1>
          <p className="mt-4 text-2xl">
            Create, edit, and manage your marketing campaigns.
          </p>
          <div className="mt-8">
            <Link
              href="/marketing/analytics"
              className="inline-block px-6 py-2 bg-white text-blue-800 font-medium rounded-md">
              Go to Analytics
            </Link>
          </div>
        </div>
      </header>
      <main className="w-full px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl shadow-lg border border-gray-300">
            <h2 className="text-2xl font-bold text-black mb-6">
              {editingCampaign ? "Edit Campaign" : "Create a New Campaign"}
            </h2>
            <CampaignForm
              onSubmit={editingCampaign ? handleUpdateCampaign : handleCreateCampaign}
              initialData={
                editingCampaign
                  ? editingCampaign
                  : {
                      name: "",
                      description: "",
                      budget: 0,
                      startDate: "",
                      endDate: "",
                      targetAudience: "",
                    }
              }
              isEditing={!!editingCampaign}
              onCancel={() => setEditingCampaign(null)}
            />
          </div>
          <div className="p-6 rounded-xl shadow-lg border border-gray-300">
            <div className="flex flex-col space-y-6">
              <h2 className="text-2xl font-bold text-black">Existing Campaigns</h2>
              <input
                type="text"
                placeholder="Search by name..."
                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-4">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
                  </div>
                ) : filteredCampaigns.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-black">No campaigns found.</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {filteredCampaigns.map((campaign) => (
                      <li
                        key={campaign.id}
                        className="p-3 rounded-lg border border-gray-300">
                        <div className="flex flex-col space-y-1">
                          <h3 className="font-bold text-black">
                            {campaign.name}
                          </h3>
                          <p className="text-xs text-black">
                            Description: {campaign.description}</p>
                          <p className="text-xs text-black">
                            Budget: ${campaign.budget}
                          </p>
                          <p className="text-xs text-black">
                            Duration: {campaign.startDate} to {campaign.endDate}
                          </p>
                          <p className="text-xs text-black">
                            Target Audience: {campaign.targetAudience}
                          </p>
                          <p className="text-xs font-semibold text-black">
                            Status: {campaign.launched ? "Launched" : "Not Launched"}
                          </p>
                          <div className="flex gap-2 mt-1">
                            {!campaign.launched && (
                              <button
                                onClick={() => handleLaunchCampaign(campaign)}
                                className="px-2 py-1 bg-green-800 text-white rounded text-sm">
                                Launch
                              </button>
                            )}
                            <button
                              onClick={() => setEditingCampaign(campaign)}
                              className="px-2 py-1 bg-blue-800 text-white rounded text-xs">
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCampaign(campaign.id)}
                              className="px-2 py-1 bg-red-800 text-white rounded text-xs">
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}