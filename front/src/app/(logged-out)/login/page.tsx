"use client";

import { useUserStatus } from "@/hooks";
import { apiRequest } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userType, isLoading, refreshStatus } = useUserStatus();

  if (!isLoading) {
    if (userType === "agency") {
      router.push("/agency");
    }
    if (userType === "composer") {
      router.push("/composer");
    }
  }

  const handleLogin = async () => {
    try {
      const response = await apiRequest("http://localhost:8000/api/login/", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        credentials: "include",
      });
      if (response) {
        ("Login successful");
        await refreshStatus(); // 로그인 후 상태 새로고침
        router.push("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
  return (
    <div className="flex flex-col items-center h-screen p-4 gap-4">
      <div className="text-2xl font-bold">로그인</div>
      <div className="min-w-[300px]">
        <p>이메일</p>
        <input
          className="w-full"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="min-w-[300px]">
        <p>비밀번호</p>
        <input
          className="w-full"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="min-w-[300px]">
        <button
          className="min-w-[300px] border-2 border-gray-300 rounded-md p-2"
          onClick={handleLogin}
        >
          로그인
        </button>
      </div>
      <div className="min-w-[300px]">
        <p className="text-center">계정이 없으신가요? 계정을 만드세요?</p>
      </div>
    </div>
  );
};

export default LoginPage;
