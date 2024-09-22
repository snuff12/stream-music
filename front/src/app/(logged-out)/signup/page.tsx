"use client";

import { useUserStatus } from "@/hooks";
import { apiRequest } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [type, setType] = useState<"composer" | "agency">("composer");
  const { userType, isLoading } = useUserStatus();

  if (!isLoading) {
    if (userType === "agency") {
      router.push("/agency");
    }
    if (userType === "composer") {
      router.push("/composer");
    }
  }

  const handleSignup = async () => {
    try {
      await apiRequest("http://localhost:8000/api/register/", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          user_type: type,
        }),
      });
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen p-4 gap-4">
      <div className="text-2xl font-bold">회원가입</div>
      <div className="min-w-[300px] bg-slate-300 flex justify-between p-4">
        <div
          className={`${
            type === "composer" && "bg-white"
          } min-w-[130px] text-center`}
          onClick={() => {
            setType("composer");
          }}
        >
          작곡가
        </div>
        <div
          className={`${
            type === "agency" && "bg-white"
          } min-w-[130px] text-center`}
          onClick={() => {
            setType("agency");
          }}
        >
          음악기획사
        </div>
      </div>
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
        <p>비밀번호 확인</p>
        <input
          className="w-full"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>
      <div className="min-w-[300px]">
        <button
          className="min-w-[300px] border-2 border-gray-300 rounded-md p-2"
          onClick={handleSignup}
        >
          회원가입
        </button>
      </div>
      <div className="min-w-[300px]">
        <p className="text-center">이미 계정이 있으신가요? 로그인하세요.</p>
      </div>
    </div>
  );
};

export default SignupPage;
