/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateProfileMutation } from "@/redux/api/userApi";
import { ImageUpload } from "@/utils/imageUpload";
import { TUser } from "@/utils/types";
import Image from "next/image";

import { useState } from "react";
import { toast } from "sonner";

export function EditProfile({ title, icon }: { title: string; icon: boolean }) {
  const [updateUseProfile, { isLoading }] = useUpdateProfileMutation();
  const [userData, setUserData] = useState<Partial<TUser>>({
    // name: "",
    // phone: "",
    // img: "",
  });

  // handleInputChange
  const handleInputChange = (e: any) => {
    // text feaild data
    setUserData((prevData) => ({
      ...prevData,
      [e.name]: e.value,
    }));
  };

  // image upload
  const handleImageUpload = async (e: any) => {
    try {
      // local url
      const imageLink = await ImageUpload(e);
      // const localUrl = URL.createObjectURL(e);
      if (imageLink) {
        setUserData((prevData) => ({
          ...prevData,
          images: imageLink,
        }));
      }
      // console.log(e);
    } catch (err) {
      console.log(err);
    }
  };

  // handleFormSubmit;
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    if (!userData.name && !userData.phone && !userData.img) {
      return toast.error("provide name email or img ");
    }
    console.log(userData);

    try {
      const res = await updateUseProfile(userData).unwrap();
      if (res.success) {
        toast.success(res.message || "profile Update success");
        setUserData({
          name: "",
          phone: "",
          img: "",
        });
      }
    } catch (err: any) {
      toast.error(err.message || "post added Failed !!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-1 px-3 bg-blue-500 hover:bg-blue-600 rounded text-white flex items-center gap-2">
          <span className=" text-white flex items-center gap-2">
            {icon && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
            )}

            <span>{title}</span>
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
          {" "}
          <div>
            <Input
              onChange={(e) => handleInputChange(e.target)}
              name="name"
              placeholder="enter name here"
              className="col-span-3 cursor-pointer"
              value={userData?.name || ""}
            />
          </div>
          <div>
            <Input
              onChange={(e) => handleInputChange(e.target)}
              name="phone"
              value={userData?.phone || ""}
              placeholder="enter phone Number"
              className="col-span-3 cursor-pointer"
            />
          </div>
          <div>
            {!userData?.img ? (
              <Input
                name="img"
                onChange={(e) => handleImageUpload(e.target.files?.[0])}
                type="file"
                id="category"
                className="col-span-3 cursor-pointer"
                placeholder="select Image"
                value={userData?.img || ""}
              />
            ) : (
              <Image
                src={userData?.img}
                width={100}
                className="cursor-pointer"
                height={100}
                alt="post Image"
              />
            )}
          </div>
          <DialogFooter>
            <Button className="block w-full" type="submit">
              {isLoading ? "post add ..." : "Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
