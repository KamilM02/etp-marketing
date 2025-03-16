"use client";
import React from "react";
import Link from "next/link";

export default function MarketingDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className=" text-blue-600 py-16 px-6">
        <div className="w-full text-center">
          <h1 className="text-5xl font-extrabold">Marketing Dashboard</h1>
        </div>
      </header>
      <main className="flex-grow px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Link 
            href="/marketing/campaigns" 
            className="block bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-3">Campaigns</h2>
            <p className="text-gray-600">
              Create and manage marketing campaigns for your events.
            </p>
          </Link>
          <Link 
            href="/marketing/analytics" 
            className="block bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-3">Analytics</h2>
            <p className="text-gray-600">
              View performance metrics and gain insights on ticket sales.
            </p>
          </Link>
          <Link 
            href="/marketing/social-media" 
            className="block bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-3">Social Media</h2>
            <p className="text-gray-600">
              Manage and schedule your social posts to boost event visibility.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
