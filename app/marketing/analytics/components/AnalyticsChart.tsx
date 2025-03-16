// src/app/marketing/analytics/components/AnalyticsChart.tsx
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
import { AnalyticsData } from "../../../services/analyticsService";

type AnalyticsChartProps = {
  data: AnalyticsData[];
};

// component to display general analytics data in a bar chart
export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="grey" />
          <XAxis dataKey="day" stroke="black" />
          <YAxis stroke="black" />
          <Tooltip labelStyle={{ color: "black", fontWeight: "bold"}} />
          <Legend />
          <Bar dataKey="ticketsSold" fill="blue" name="Tickets Sold" />
          <Bar dataKey="revenue" fill="teal" name="Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
