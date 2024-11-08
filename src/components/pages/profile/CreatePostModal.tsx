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
import { useAddPostMutation } from "@/redux/api/postsApi";
import { allCategory } from "@/utils/const-data/category";
import { ImageUpload } from "@/utils/imageUpload";
import { TPostData } from "@/utils/types";
import Image from "next/image";

import { useState } from "react";
import { toast } from "sonner";

export function CreatePost() {
  const [addPost, { isLoading }] = useAddPostMutation();
  const [postData, setPostData] = useState<TPostData>({
    title: "",
    content: "",
    images: "",
    category: "Web",
    tags: [""],
    isPremium: false,
  });

  const handleDescriptionEditorChange = (content: string) => {
    setPostData((prevData) => ({
      ...prevData,
      content: content,
    }));
  };
  // handleInputChange
  const handleInputChange = (e: any) => {
    // tags
    if (e.name === "isPremium") {
      setPostData((prevData) => ({
        ...prevData,
        [e.name]: e.checked,
      }));
      return;
    }
    // tags
    if (e.name === "tags") {
      const tags = e.value.split(",");
      setPostData((prevData) => ({
        ...prevData,
        [e.name]: tags,
      }));
      return;
    }
    // text feild data
    setPostData((prevData) => ({
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
        setPostData((prevData) => ({
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
    console.log(postData);

    if (!postData.content) {
      toast.error("provide description");
      return;
    }
    try {
      const res = await addPost(postData).unwrap();
      if (res.success) {
        toast.success(res.message || "post add successfully");
        setPostData({
          title: "",
          content: "",
          images: "",
          category: "Web",
          isPremium: false,
          tags: [""],
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 text-white"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Create Post</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
          {" "}
          <div>
            <Input
              onChange={(e) => handleInputChange(e.target)}
              name="title"
              placeholder="enter title here"
              className="col-span-3 cursor-pointer"
              value={postData?.title}
              required
            />
          </div>
          <div>
            <TinyMCEEditor
              onChange={handleDescriptionEditorChange}
              value={postData.content}
              height={150}
              toolbar="undo redo | bold italic | alignleft aligncenter"
              required
            />
          </div>
          <div>
            <select
              onChange={(e) => handleInputChange(e.target)}
              className="block cursor-pointer border p-2 w-full rounded text-gray-500"
              name="category"
              value={postData?.category}
              id=""
              required
            >
              <option> select Category</option>
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
              required
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
            {!postData?.images ? (
              <Input
                name="images"
                onChange={(e) => handleImageUpload(e.target.files?.[0])}
                type="file"
                id="category"
                className="col-span-3 cursor-pointer"
                placeholder="select Image"
                value={postData?.images}
                required
              />
            ) : (
              <Image
                src={postData?.images}
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
