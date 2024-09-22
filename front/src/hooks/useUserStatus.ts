import { apiRequest } from "@/lib/utils";
import { useState, useEffect } from "react";

const useUserStatus = () => {
  const [userStatus, setUserStatus] = useState({
    isLoggedIn: false,
    userType: null,
    email: null,
    userId: null,
    isLoading: true,
  });
  const checkUserStatus = async () => {
    try {
      const data = await apiRequest("http://localhost:8000/api/user-status/", {
        method: "GET",
        credentials: "include", // 쿠키 포함
      });
      if (data) {
        setUserStatus({
          isLoggedIn: true,
          userType: data.userType,
          email: data.email,
          userId: data.userId,
          isLoading: false,
        });
      } else {
        setUserStatus({
          isLoggedIn: false,
          userType: null,
          email: null,
          userId: null,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error checking user status:", error);
      setUserStatus({
        isLoggedIn: false,
        userType: null,
        email: null,
        userId: null,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return { ...userStatus, refreshStatus: checkUserStatus };
};

export default useUserStatus;
