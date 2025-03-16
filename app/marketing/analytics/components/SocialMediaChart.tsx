// src/app/marketing/analytics/components/SocialMediaChart.tsx
"use client";

import React from "react";
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip, Legend,
} from "recharts";
import { AnalyticsData } from "../../../services/analyticsService";

type SocialMediaChartProps = {
  data: AnalyticsData[];
};

// component to display social media analytics data in a bar chart
export default function SocialMediaChart({ data }: SocialMediaChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="grey" />
          <XAxis dataKey="day" stroke="black"/>
          <YAxis stroke="black" />
          <Tooltip labelStyle={{ color: "black", fontWeight: "bold"}} />
          <Legend />
          <Bar dataKey="socialMediaImpressions" fill="blue" name="Impressions" />
          <Bar dataKey="socialMediaEngagement" fill="teal" name="Engagement" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
