"use client";
import { Card } from "@/components/ui/card";
import { useUserStatus } from "@/hooks";
import { getPitches } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AgencyPage = () => {
  const router = useRouter();
  const { userType, isLoading } = useUserStatus();
  const [pitches, setPitches] = useState<
    {
      id: string;
      file_name: string;
      composer_email: string;
      agency_email: string;
      pitched_at: string;
    }[]
  >([]);
  if (!isLoading) {
    if (userType === "composer") {
      router.push("/composer");
    }
    if (!userType) {
      router.push("/login");
    }
  }
  useEffect(() => {
    const getData = async () => {
      const data = await getPitches();
      setPitches(data);
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="flex justify-between w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">곡</h1>
      </div>
      <Card className="w-full max-w-md p-4">
        <h2 className="text-lg mb-2">곡 목록</h2>
        <p className="mb-4">작곡가가 피칭한 데모곡을 확인하세요</p>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span>#</span>
            <span>곡 제목</span>
            <span>보낸 사람</span>
            <span>피칭 일시</span>
          </div>
          {pitches?.map((pitch, i) => {
            return (
              <div key={pitch.id} className="flex justify-between gap-5">
                <span className="overflow-x-scroll w-full">{i + 1}</span>
                <span className="overflow-x-scroll w-full">
                  {pitch.file_name.split("/").pop()}
                </span>
                <span className="overflow-x-scroll w-full">
                  {pitch.composer_email}
                </span>
                <span className="overflow-x-scroll w-full">
                  {pitch.pitched_at}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default AgencyPage;
