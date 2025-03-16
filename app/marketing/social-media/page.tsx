"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SocialMediaForm from "./components/SocialMediaForm";
import {SocialPost, fetchSocialPosts, createSocialPost, updateSocialPost, deleteSocialPost,
} from "../../services/socialMediaService";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

// allowed platorm types
type Platform = "Facebook" | "Instagram" | "Twitter" | "LinkedIn";

export default function SocialMediaPage() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<SocialPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // state of linked accounts
  const [linkedAccounts, setLinkedAccounts] = useState<Record<Platform, boolean>>({
    Facebook: false,
    Instagram: false,
    Twitter: false,
    LinkedIn: false,
  });

  // fetch posts as youre loading onto the page
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchSocialPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  const handleLinkAccount = (platform: Platform) => {
    setLinkedAccounts((prev) => ({ ...prev, [platform]: true }));
  };

  const handleCreatePost = async (postData: Omit<SocialPost, "id">) => {
    if (!linkedAccounts[postData.platform as Platform]) {
      alert(`Please link your ${postData.platform} account first.`);
      return;
    }
    const created = await createSocialPost(postData);
    setPosts((prevPosts) => [...prevPosts, created]);
  };

  const handleUpdatePost = async (updatedData: Omit<SocialPost, "id">) => {
    if (editingPost) {
      if (!linkedAccounts[updatedData.platform as Platform]) {
        alert(`Please link your ${updatedData.platform} account first.`);
        return;
      }
      const updated = await updateSocialPost(editingPost.id, updatedData);
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === editingPost.id ? updated : p))
      );
      setEditingPost(null);
    }
  };

  const handleDeletePost = async (id: number) => {
    await deleteSocialPost(id);
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== id));
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full">
      <header className="w-full bg-blue-800 text-white py-12 px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold drop-shadow-md">Social Media</h1>
          <p className="mt-4 text-2xl">Schedule posts to promote your events</p>
          <div className="mt-8">
            <Link
              href="/marketing/analytics"
              className="inline-block px-6 py-2 bg-white text-blue-800 font-medium rounded-md">
              Go to Analytics
            </Link>
          </div>
        </div>
      </header>

      {/* linking the accounts */}
      <section className="w-full px-8 py-6">
        <div className="max-w-7xl mx-auto p-6 rounded-xl shadow-lg border border-gray-300">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Link Your Social Media Accounts
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {Object.entries(linkedAccounts).map(([platform, linked]) => (
              <div key={platform} className="flex flex-col items-center">
                <button
                  onClick={() => handleLinkAccount(platform as Platform)}
                  className={`px-6 py-3 rounded-lg transition flex items-center space-x-2 ${
                    linked
                      ? "bg-blue-800 text-white"
                      : "bg-white text-blue-800 border border-blue-800"
                  }`}
                >
                  {platform === "Facebook" && <FaFacebook className="text-xl" />}
                  {platform === "Instagram" && <FaInstagram className="text-xl" />}
                  {platform === "Twitter" && <FaTwitter className="text-xl" />}
                  {platform === "LinkedIn" && <FaLinkedin className="text-xl" />}
                  <span>{linked ? "Linked" : "Link"}</span>
                </button>
                <p className="mt-2 text-sm text-black">{platform}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <main className="w-full px-8 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* create new post form */}
          <div className="p-6 rounded-xl border border-gray-300 shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-6">
              {editingPost ? "Edit Post" : "Create a New Post"}
            </h2>
            <SocialMediaForm
              onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
              initialData={
                editingPost
                  ? editingPost
                  : { platform: "", message: "", scheduledDateTime: "" }
              }
              isEditing={!!editingPost}
              onCancel={() => setEditingPost(null)}
            />
          </div>

          {/* list of posts */}
          <div className="p-6 rounded-xl shadow-lg border border-gray-300">
            <div className="flex flex-col space-y-6">
              <h2 className="text-2xl font-bold text-black">Scheduled Posts</h2>
              <input
                type="text"
                placeholder="Search posts..."
                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="h-[500px] overflow-y-auto pr-4">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium text-black">No posts found</h3>
                    <p className="mt-1 text-sm text-black">
                      {searchTerm
                        ? "Didn't find anything! Sori! :("
                        : "Get started by scheduling your first post"}
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {filteredPosts.map((post) => (
                      <li
                        key={post.id}
                        className="p-4 rounded-lg border border-gray-200">
                        <div className="flex flex-col space-y-2">
                          <h3 className="text-xl font-semibold text-black">
                            {post.platform}
                          </h3>
                          <p className="text-black">{post.message}</p>
                          <p className="text-black text-sm">
                            Scheduled:{" "}
                            {new Date(post.scheduledDateTime).toLocaleString()}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingPost(post)}
                              className="px-4 py-2 bg-blue-800 text-white rounded">
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="px-4 py-2 bg-red-800 text-white rounded">
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