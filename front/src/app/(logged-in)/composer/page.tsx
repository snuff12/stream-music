"use client";
import { useUserStatus } from "@/hooks";
import { useRouter } from "next/navigation";

const ComposerPage = () => {
  const { userType, isLoading } = useUserStatus();
  const router = useRouter();
  if (!isLoading) {
    if (userType === "composer") {
      router.push("/composer/upload");
    } else if (userType === "agency") {
      router.push("/agency");
    } else if (!userType) {
      router.push("/login");
    }
  }

  return <div></div>;
};

export default ComposerPage;
