"use client";
import { useUserStatus } from "@/hooks";
import Link from "next/link";

const Header = () => {
  const { userType } = useUserStatus();
  return (
    <div className="flex w-full justify-between items-center border-b-2 border-gray-300 p-2">
      <div>스트로베리필즈</div>
      {!userType ? (
        <div className="flex gap-4">
          <div className="cursor-pointer">
            <Link href="/login">로그인</Link>
          </div>
          <div className="cursor-pointer">
            <Link href="/signup">회원가입</Link>
          </div>
        </div>
      ) : userType === "composer" ? (
        <div className="flex gap-4">
          <div className="cursor-pointer">
            <Link href="/composer/upload">곡 업로드</Link>
          </div>
          <div className="cursor-pointer">
            <Link href="/composer/pitching">피칭</Link>
          </div>
        </div>
      ) : userType === "agency" ? (
        <div className="flex gap-4">
          <div>곡</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
