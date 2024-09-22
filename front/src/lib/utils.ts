import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const handleTokenExpiration = async () => {
  try {
    // 리프레시 토큰으로 새 액세스 토큰 요청
    await apiRequest("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};

export const apiRequest = async (url: string, options: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    if (response.status === 401) {
      // 토큰 만료 시 처리 (예: 로그아웃 또는 토큰 갱신)
      await handleTokenExpiration();
    }
    throw new Error("API request failed");
  }

  return response.json();
};

export const getFiles = async () => {
  const response = await fetch("http://localhost:8000/api/files/", {
    method: "GET",
    credentials: "include",
  });
  if (response.ok) {
    return response.json();
  } else {
    if (response.status === 401) {
      // 토큰 만료 시 처리 (예: 로그아웃 또는 토큰 갱신)
      await handleTokenExpiration();
    }
    throw new Error("API request failed");
  }
};

export const getAgencies = async () => {
  const response = await fetch("http://localhost:8000/api/agencies/", {
    method: "GET",
    credentials: "include",
  });
  if (response.ok) {
    return response.json();
  } else {
    if (response.status === 401) {
      // 토큰 만료 시 처리 (예: 로그아웃 또는 토큰 갱신)
      await handleTokenExpiration();
    }
    throw new Error("API request failed");
  }
};

export const pitchDemo = async (
  composerEmail: string,
  agencyEmail: string,
  fileId: string
) => {
  const response = await fetch("http://localhost:8000/api/pitch/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json", // JSON 형식으로 설정
    },

    body: JSON.stringify({
      composer_email: composerEmail,
      agency_email: agencyEmail,
      file: fileId,
    }),
  });
  if (response.ok) {
    return response.json();
  } else {
    if (response.status === 401) {
      // 토큰 만료 시 처리 (예: 로그아웃 또는 토큰 갱신)
      await handleTokenExpiration();
    }
    throw new Error("API request failed");
  }
};

export const getPitches = async () => {
  const response = await fetch("http://localhost:8000/api/pitches/", {
    method: "GET",
    credentials: "include",
  });
  if (response.ok) {
    return response.json();
  } else {
    if (response.status === 401) {
      // 토큰 만료 시 처리 (예: 로그아웃 또는 토큰 갱신)
      await handleTokenExpiration();
    }
    throw new Error("API request failed");
  }
};
