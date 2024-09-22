"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAgencies, getFiles, pitchDemo } from "@/lib/utils";
import { useUserStatus } from "@/hooks";

const PitchingDialog = () => {
  const [file, setFile] = useState<File>();
  const [agencyEmail, setAgencyEmail] = useState("");
  const [description, setDescription] = useState("");
  const [filesList, setFilesList] = useState<File[]>([]);
  const [agencies, setAgencies] = useState<{ id: string; email: string }[]>([]);
  const { email } = useUserStatus();

  const handleSubmit = async () => {
    // 제출 로직 구현
    if (email && file) {
      await pitchDemo(email, agencyEmail, file.id);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const fileData = await getFiles();
      setFilesList(fileData ?? []);
      const agencyData = await getAgencies();
      setAgencies(agencyData ?? []);
    };
    getData();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">피칭하기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>피칭</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Select onValueChange={setFile}>
            <SelectTrigger>
              <SelectValue placeholder="피칭할 데모곡을 선택하세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {filesList.map((file) => (
                  <SelectItem key={file.id} value={file}>
                    {file.file.split("/").pop()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={setAgencyEmail}>
            <SelectTrigger>
              <SelectValue placeholder="데모곡을 받은 사람을 선택하세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {agencies.map((agency) => (
                  <SelectItem key={agency.id} value={agency.email}>
                    {agency.email}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="(선택 사항) 메시지를 입력하세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Button onClick={handleSubmit}>피칭하기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PitchingDialog;
