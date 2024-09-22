"use client";
import PitchingDialog from "@/app/components/PitchingDialog";
import { Card } from "@/components/ui/card";
import { getPitches } from "@/lib/utils";
import { useEffect, useState } from "react";

const PitchingPage = () => {
  const [pitches, setPitches] = useState<
    {
      id: string;
      file_name: string;
      agency_email: string;
      pitched_at: string;
    }[]
  >([]);
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
        <h1 className="text-2xl font-bold mb-4">피칭</h1>
        <PitchingDialog />
      </div>
      <Card className="w-full max-w-md p-4">
        <h2 className="text-lg mb-2">피칭 내역</h2>
        <p className="mb-4">
          오른쪽 상단의 &quot;피칭하기&quot; 버튼을 클릭해 데모곡을 피칭하세요.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span>#</span>
            <span>곡 제목</span>
            <span>리드</span>
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
                  {pitch.agency_email}
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

export default PitchingPage;
