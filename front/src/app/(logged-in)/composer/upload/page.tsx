"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getFiles } from "@/lib/utils";

const UploadPage = () => {
  const [filesList, setFilesList] = useState([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!file) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8000/api/upload/", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (response.ok) {
          console.log("File uploaded successfully");
          // 성공 처리 로직
        } else {
          console.error("File upload failed");
          // 실패 처리 로직
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        // 에러 처리 로직
      }
      const data = await getFiles();
      setFilesList(data ?? []);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getFiles();
      setFilesList(data ?? []);
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="flex justify-between w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">업로드</h1>
        <div className="flex items-center gap-1.5 ">
          <Input id="song" type="file" onChange={handleFileChange} />
        </div>
      </div>
      <Card className="w-full max-w-md p-4">
        <h2 className="text-lg mb-2">곡 업로드 목록</h2>
        <p className="mb-4">
          오른쪽 상단의 &quot;파일 선택&quot; 버튼을 클릭해 데모곡을
          업로드하세요.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span>#</span>
            <span>곡 제목</span>
          </div>
          {filesList.map((file, i) => {
            return (
              <div key={file.file} className="flex justify-between">
                <span>{i + 1}</span>
                <span>{file.file.split("/").pop()}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default UploadPage;
