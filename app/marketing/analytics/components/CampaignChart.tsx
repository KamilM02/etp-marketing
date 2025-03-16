// src/app/marketing/analytics/components/CampaignAnalyticsChart.tsx
"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { CampaignAnalyticsData } from "../../../services/campaignAnalyticsService";

type CampaignAnalyticsChartProps = {
  data: CampaignAnalyticsData[];
};

// component to display campaign analytics data in a bar chart
export default function CampaignAnalyticsChart({ data }: CampaignAnalyticsChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="grey" />
          <XAxis dataKey="campaignName" stroke="black" />
          <YAxis stroke="black" />
          <Tooltip labelStyle={{ color: "black", fontWeight: "bold"}} />
          <Legend />
          <Bar dataKey="impressions" fill="blue" name="Impressions" />
          <Bar dataKey="clicks" fill="teal" name="Clicks" />
          <Bar dataKey="conversions" fill="green" name="Conversions" />
          <Bar dataKey="revenue" fill="orange" name="Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
