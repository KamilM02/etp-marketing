"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AnalyticsChart from "./components/AnalyticsChart";
import SocialMediaChart from "./components/SocialMediaChart";
import CampaignAnalyticsChart from "./components/CampaignChart";
import { fetchAnalyticsData, AnalyticsData } from "../../services/analyticsService";
import { fetchCampaignAnalytics, CampaignAnalyticsData } from "../../services/campaignAnalyticsService";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [campaignAnalytics, setCampaignAnalytics] = useState<CampaignAnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const overallData = await fetchAnalyticsData();
        setAnalytics(overallData);
        const campaignData = await fetchCampaignAnalytics();
        setCampaignAnalytics(campaignData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // general analytics (total tickets, revenue, impressions, engagement, conversion rate)
  const totalTickets = analytics.reduce((acc, cur) => acc + cur.ticketsSold, 0);
  const totalRevenue = analytics.reduce((acc, cur) => acc + cur.revenue, 0);
  const totalImpressions = analytics.reduce((acc, cur) => acc + cur.socialMediaImpressions, 0);
  const totalEngagement = analytics.reduce((acc, cur) => acc + cur.socialMediaEngagement, 0);
  const overallConversionRate = totalEngagement
    ? ((totalTickets / totalEngagement) * 100).toFixed(2)
    : "0";

  // camapaign analytics (total conversions, clicks, conversion rate)
  const totalCampaignConversions = campaignAnalytics.reduce((acc, cur) => acc + cur.conversions, 0);
  const totalCampaignClicks = campaignAnalytics.reduce((acc, cur) => acc + cur.clicks, 0);
  const campaignConversionRate = totalCampaignClicks
    ? ((totalCampaignConversions / totalCampaignClicks) * 100).toFixed(2)
    : "0";

  return (
    <div className="min-h-screen w-full">
      <header className="w-full bg-blue-800 text-white py-8 px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold drop-shadow-md">Analytics Dashboard</h1>
          <p className="mt-4 text-2xl">
            Monitor ticket sales and marketing performance.
          </p>
          <div className="mt-8 space-x-4">
            <Link
              href="/marketing/campaigns"
              className="inline-block px-6 py-2 bg-white text-blue-800 font-medium rounded-md">
              Go to Campaigns
            </Link>
            <Link
              href="/marketing/social-media"
              className="inline-block px-6 py-2 bg-white text-blue-800 font-medium rounded-md">
              Go to Social Media 
            </Link>
          </div>
        </div>
      </header>
      <main className="w-full px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {loading ? (
            <div className="text-center text-black-600">Loading analytics data...</div>
          ) : (
            <>
              {/* general metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <h2 className="text-xl font-semibold text-black">Total Tickets</h2>
                  <p className="mt-2 text-2xl font-bold text-blue-800">{totalTickets}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <h2 className="text-xl font-semibold text-black">Total Revenue</h2>
                  <p className="mt-2 text-2xl font-bold text-blue-800">${totalRevenue}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <h2 className="text-xl font-semibold text-black">Impressions</h2>
                  <p className="mt-2 text-2xl font-bold text-blue-800">{totalImpressions}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <h2 className="text-xl font-semibold text-black">Engagement</h2>
                  <p className="mt-2 text-2xl font-bold text-blue-800">{totalEngagement}</p>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-lg text-black">
                  Overall Conversion Rate:{" "}
                  <span className="font-bold text-blue-800">{overallConversionRate}%</span>
                </p>
              </div>
              <div className="p-6 rounded-xl shadow-lg border border-gray-300">
                <h2 className="text-2xl font-bold text-black mb-4 text-center">
                  Ticket Sales Analytics
                </h2>
                <AnalyticsChart data={analytics} />
              </div>
              {/* social media metrics */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300">
                <h2 className="text-2xl font-bold text-black mb-4 text-center">
                  Social Media Metrics
                </h2>
                <SocialMediaChart data={analytics} />
              </div>
              {/* campaign metrics */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300">
                <h2 className="text-2xl font-bold text-black mb-4 text-center">
                  Campaign Analytics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
                  <div className="bg-gray-50 p-4 rounded shadow text-center">
                    <h3 className="text-lg font-semibold text-black">Total Conversions</h3>
                    <p className="mt-2 text-xl font-bold text-blue-800">{totalCampaignConversions}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded shadow text-center">
                    <h3 className="text-lg font-semibold text-black">Total Clicks</h3>
                    <p className="mt-2 text-xl font-bold text-blue-800">{totalCampaignClicks}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded shadow text-center">
                    <h3 className="text-lg font-semibold text-black">Conversion Rate</h3>
                    <p className="mt-2 text-xl font-bold text-blue-800">{campaignConversionRate}%</p>
                  </div>
                </div>
                <CampaignAnalyticsChart data={campaignAnalytics} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
