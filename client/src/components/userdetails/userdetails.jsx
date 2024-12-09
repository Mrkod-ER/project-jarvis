"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const StoreUserDetails = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Extract user details
      const userDetails = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0]?.emailAddress,
        profileImageUrl: user.profileImageUrl,
      };

      // Store user details in local storage
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      console.log("User details stored in localStorage:", userDetails);
    } else if (!isSignedIn) {
      // Clear local storage if user logs out
      localStorage.removeItem("userDetails");
      console.log("User is not signed in. Local storage cleared.");
    }
  }, [isLoaded, isSignedIn, user]);

  return ;
};

export default StoreUserDetails;
