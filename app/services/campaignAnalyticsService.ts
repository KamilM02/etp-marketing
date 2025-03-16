export type CampaignAnalyticsData = {
    campaignId: number;
    campaignName: string;
    impressions: number;
    clicks: number;
    conversions: number;
    revenue: number;
  };
  
  // Fallback data for campaign analytics
  const fallbackCampaignAnalytics: CampaignAnalyticsData[] = [
    {
      campaignId: 1,
      campaignName: "summer fun",
      impressions: 5000,
      clicks: 300,
      conversions: 50,
      revenue: 1000,
    },
    {
      campaignId: 2,
      campaignName: "campaign2",
      impressions: 6000,
      clicks: 350,
      conversions: 60,
      revenue: 1200,
    },
  ];
  
  /*
    * Attempts to call the placeholder API, falling back to the hard-coded data.
    * Will be be changed when I will implement spring boot backend
   */
  export const fetchCampaignAnalytics = async (): Promise<CampaignAnalyticsData[]> => {
    try {
      const response = await fetch("https://example.com/api/campaign-analytics");
      if (!response.ok) {
        throw new Error("Failed to fetch campaign analytics data");
      }
      return await response.json();
    } catch (error) {
      console.warn(
        "API call failed in fetchCampaignAnalytics, using fallback data.",
        error
      );
      return fallbackCampaignAnalytics;
    }
  };
  