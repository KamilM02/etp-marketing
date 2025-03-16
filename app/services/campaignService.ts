export type Campaign = {
    id: number;
    name: string;
    description: string;
    budget: number;
    startDate: string;
    endDate: string;
    targetAudience: string;
    launched: boolean;
  };
  
  // Hard-coded fallback campaigns data
  const fallbackCampaigns: Campaign[] = [
    {
      id: 1,
      name: "summer fun",
      description: "cant wait for summer!",
      budget: 1000,
      startDate: "2025-06-01",
      endDate: "2025-06-15",
      targetAudience: "music enjoyers",
      launched: false,
    },
    {
      id: 2,
      name: "Campaign2",
      description: "Some Description",
      budget: 1500,
      startDate: "2025-12-01",
      endDate: "2025-12-15",
      targetAudience: "me myself and I",
      launched: true,
    },
  ];
  
  /*
    * Attempts to call the placeholder API, falling back to the hard-coded data.
    * Will be be changed when I will implement spring boot backend
   */
  export const fetchCampaigns = async (): Promise<Campaign[]> => {
    try {
      const response = await fetch("https://example.com/api/campaigns");
      if (!response.ok) throw new Error("Failed to fetch campaigns");
      return await response.json();
    } catch (error) {
      console.warn("API call failed in fetchCampaigns, using fallback data.", error);
      return fallbackCampaigns;
    }
  };
  
  export const createCampaign = async (
    newCampaign: Omit<Campaign, "id" | "launched">
  ): Promise<Campaign> => {
    try {
      const response = await fetch("https://example.com/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCampaign),
      });
      if (!response.ok) throw new Error("Failed to create campaign");
      return await response.json();
    } catch (error) {
      console.warn("API call failed in createCampaign, simulating creation.", error);
      return new Promise((resolve) => {
        setTimeout(() => {
          // assign a new ID and mark as not launched, as the actual API would
          const campaign: Campaign = { id: Date.now(), launched: false, ...newCampaign };
          resolve(campaign);
        }, 500);
      });
    }
  };
  
  export const updateCampaign = async (
    id: number,
    updatedData: Omit<Campaign, "id">
  ): Promise<Campaign> => {
    try {
      const response = await fetch(`https://example.com/api/campaigns/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error("Failed to update campaign");
      return await response.json();
    } catch (error) {
      console.warn("API call failed in updateCampaign, simulating update.", error);
      return new Promise((resolve) => {
          resolve({ id, ...updatedData });
      });
    }
  };
  
  export const deleteCampaign = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`https://example.com/api/campaigns/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete campaign");
      await response.json();
    } catch (error) {
      console.warn("API call failed in deleteCampaign, simulating deletion.", error);
      return new Promise((resolve) => {
          resolve();
      });
    }
  };
  