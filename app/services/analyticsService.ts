export type AnalyticsData = {
    day: string;
    ticketsSold: number;
    revenue: number;
    socialMediaImpressions: number;
    socialMediaEngagement: number;
  };
  
  // fallback data for analytics
  const fallbackAnalyticsData: AnalyticsData[] = [
    {
      day: "Monday",
      ticketsSold: 50,
      revenue: 500,
      socialMediaImpressions: 1000,
      socialMediaEngagement: 150,
    },
    {
      day: "Tuesday",
      ticketsSold: 75,
      revenue: 750,
      socialMediaImpressions: 1500,
      socialMediaEngagement: 200,
    },
    {
      day: "Wednesday",
      ticketsSold: 120,
      revenue: 1200,
      socialMediaImpressions: 2000,
      socialMediaEngagement: 300,
    },
    {
      day: "Thursday",
      ticketsSold: 90,
      revenue: 900,
      socialMediaImpressions: 1800,
      socialMediaEngagement: 250,
    },
    {
      day: "Friday",
      ticketsSold: 150,
      revenue: 1500,
      socialMediaImpressions: 2500,
      socialMediaEngagement: 350,
    },
  ];
  
  /*
    * Attempts to call the placeholder API, falling back to the hard-coded data.
    * Will be be changed when I will implement spring boot backend
   */
  
  export const fetchAnalyticsData = async (): Promise<AnalyticsData[]> => {
    try {
      const response = await fetch("https://example.com/api/analytics");
      if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
      }
      return await response.json();
    } catch (error) {
      console.warn("API call failed in fetchAnalyticsData, using fallback data.", error);
      return fallbackAnalyticsData;
    }
  };
  