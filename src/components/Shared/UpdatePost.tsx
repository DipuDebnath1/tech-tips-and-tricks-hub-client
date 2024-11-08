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
import TinyMCEEditor from "@/components/ui/TinyMCEEditor";
import { useUpdatePostMutation } from "@/redux/api/postsApi";
import { allCategory } from "@/utils/const-data/category";
import { ImageUpload } from "@/utils/imageUpload";
import { TPost, TPostData } from "@/utils/types";
import Image from "next/image";

import { useState } from "react";
import { toast } from "sonner";

export function UpdatePost({ postData }: { postData: TPost }) {
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [updatePostData, setUpdatePostData] = useState<Partial<TPostData>>({
    // title: "",
    // content: "",
    // images: "",
    // category: "",
    // tags: [""],
    // isPremium: false,
  });

  const handleDescriptionEditorChange = (content: string) => {
    setUpdatePostData((prevData) => ({
      ...prevData,
      content: content,
    }));
  };
  // handleInputChange
  const handleInputChange = (e: any) => {
    // tags
    if (e.name === "isPremium") {
      setUpdatePostData((prevData) => ({
        ...prevData,
        [e.name]: e.checked,
      }));
      return;
    }
    // tags
    if (e.name === "tags") {
      const tags = e.value.split(",");
      setUpdatePostData((prevData) => ({
        ...prevData,
        [e.name]: tags,
      }));
      return;
    }
    // text feild data
    setUpdatePostData((prevData) => ({
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
        setUpdatePostData((prevData) => ({
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
    console.log(updatePostData);

    if (Object.values(updatePostData).length < 1) {
      toast.error("you can't update Data");
      return;
    }
    try {
      console.log(updatePostData);
      const res = await updatePost({
        postId: postData._id,
        data: updatePostData,
      }).unwrap();
      if (res.success) {
        toast.success(res.message || "post add successfully");
      }
    } catch (err: any) {
      toast.error(err.message || "post added Failed !!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-blue-600 cursor-pointer underline bg-transparent hover:bg-transparent shadow-none">
          <span>Edit </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
          {" "}
          <div>
            <Input
              onChange={(e) => handleInputChange(e.target)}
              name="title"
              placeholder="enter title here"
              className="col-span-3 cursor-pointer"
              defaultValue={postData?.title}
            />
          </div>
          <div>
            <TinyMCEEditor
              onChange={handleDescriptionEditorChange}
              value={postData.content}
              height={150}
              toolbar="undo redo | bold italic | alignleft aligncenter"
            />
          </div>
          <div>
            <select
              onChange={(e) => handleInputChange(e.target)}
              className="block cursor-pointer border p-2 w-full rounded text-gray-500"
              name="category"
              defaultValue={postData?.category}
              id=""
            >
              {allCategory.map((category, i) => (
                <option className="cursor-pointer" value={category} key={i}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Input
              onChange={(e) => handleInputChange(e.target)}
              name="tags"
              placeholder="tags separate by coma ,"
              className="col-span-3 cursor-pointer"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="isPremium"
              type="checkbox"
              name="isPremium"
              defaultChecked={postData.isPremium}
              className="cursor-pointer"
              onChange={(e) => handleInputChange(e.target)}
            />
            <label
              htmlFor="isPremium"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed cursor-pointer peer-disabled:opacity-70"
            >
              Is Premium
            </label>
          </div>
          <div>
            {!updatePostData?.images ? (
              <>
                <Image
                  src={postData?.images}
                  width={100}
                  className="cursor-pointer"
                  height={100}
                  alt="post Image"
                />
                <Input
                  name="images"
                  onChange={(e) => handleImageUpload(e.target.files?.[0])}
                  type="file"
                  id="category"
                  className="col-span-3 cursor-pointer"
                  placeholder="select Image"
                  value={updatePostData?.images}
                />
              </>
            ) : (
              <Image
                src={updatePostData?.images}
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
