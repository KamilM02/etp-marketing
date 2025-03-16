export type SocialPost = {
    id: number;
    platform: string;
    message: string;
    scheduledDateTime: string;
  };
  
  // Hard-coded fallback data
  const fallbackPosts: SocialPost[] = [
    {
      id: 1,
      platform: "Facebook",
      message: "Join us for this amazing event! It's going to be great wooooo! #fun",
      scheduledDateTime: "2025-06-15T10:00",
    },
    {
      id: 2,
      platform: "Instagram",
      message: "GET THE TICKETS NOW BEFORE THEY SELL OUT, RIGHT NOW! #FOMO",
      scheduledDateTime: "2025-06-20T09:30",
    },
  ];
  
  /*
    * Attempts to call the placeholder API, falling back to the hard-coded data.
    * Will be be changed when I will implement spring boot backend
   */
  export const fetchSocialPosts = async (): Promise<SocialPost[]> => {
    try {
      const response = await fetch("https://example.com/api/social-posts");
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      console.warn("API call failed in fetchSocialPosts, using fallback data.", error);
      return fallbackPosts;
    }
  };
  
  export const createSocialPost = async (
    newPost: Omit<SocialPost, "id">
  ): Promise<SocialPost> => {
    try {
      const response = await fetch("https://example.com/api/social-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) throw new Error("Failed to create social post");
      return await response.json();
    } catch (error) {
      console.warn("API call failed in createSocialPost, simulating creation.", error);
      return { id: Date.now(), ...newPost };
    }
  };
  
  export const updateSocialPost = async (
    id: number,
    updatedData: Omit<SocialPost, "id">
  ): Promise<SocialPost> => {
    try {
      const response = await fetch(`https://example.com/api/social-posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error("Failed to update social post");
      return await response.json();
    } catch (error) {
      console.warn("API call failed in updateSocialPost, simulating update.", error);
      return { id, ...updatedData };
    }
  };
  
  export const deleteSocialPost = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`https://example.com/api/social-posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete social post");
      await response.json();
    } catch (error) {
      console.warn("API call failed in deleteSocialPost, simulating deletion.", error);
    }
  };
  