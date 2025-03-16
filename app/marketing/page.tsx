"use client";
import React from "react";
import Link from "next/link";

export default function MarketingDashboard() {
  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <header className="w-full bg-blue-800 text-white py-12 px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold drop-shadow-md">Marketing Dashboard</h1>
          <p className="mt-4 text-2xl">
            Welcome to your Marketing Dashboard. Here you can manage campaigns,
            view analytics, and schedule social media posts to boost event
            visibility.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 py-10">
        {/* Quick Links Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <Link
              href="/marketing/campaigns"
              className="block rounded-xl shadow-md p-8 border border-gray-300 bg-white hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-bold text-blue-800 mb-3">
                Campaigns
              </h2>
              <p className="text-gray-700">
                Create and manage marketing campaigns for your events.
              </p>
            </Link>
            <Link
              href="/marketing/analytics"
              className="block rounded-xl shadow-md p-8 border border-gray-300 bg-white hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-bold text-blue-800 mb-3">
                Analytics
              </h2>
              <p className="text-gray-700">
                View performance metrics and gain insights on ticket sales.
              </p>
            </Link>
            <Link
              href="/marketing/social-media"
              className="block rounded-xl shadow-md p-8 border border-gray-300 bg-white hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-bold text-blue-800 mb-3">
                Social Media
              </h2>
              <p className="text-gray-700">
                Manage and schedule your social posts to boost event visibility.
              </p>
            </Link>
          </div>
        </section>

        {/* going to implement it when implementing real backend */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-gray-300">
          <h2 className="text-3xl font-semibold text-blue-800 mb-4">
            Recent Activity
          </h2>
          <p className="text-black">
            No recent activity yet. 
          </p>
        </section>
      </main>
    </div>
  );
}
