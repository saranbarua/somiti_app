import { useState, useEffect } from "react";
import useAuthStore from "@/store/authStore";
import { MemberData, MemberResponse } from "@/types/type";

export const useMemberProfile = () => {
  const { token, checkAuth } = useAuthStore(); // Get the token from the auth store
  const [profile, setProfile] = useState<MemberData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Handle errors

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await checkAuth();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        "https://chattogram-somiti.makeupcoders.com/api/member/member-profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result: MemberResponse = await response.json(); // Type the response

      if (result.success) {
        setProfile(result.data); // The `data` will now be properly typed as `MemberData`
      } else {
        setError("Failed to fetch profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [checkAuth, token]);

  return { profile, isLoading, error };
};
