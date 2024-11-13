/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageUpload } from "@/utils/imageUpload";
import { toast } from "sonner";
import { RegisterUser } from "@/utils/actions/auth";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    img: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // image upload
  const handleImageUpload = async (e: any) => {
    try {
      // local url
      const imageLink = await ImageUpload(e);
      // const localUrl = URL.createObjectURL(e);
      if (imageLink) {
        setFormData((prevData) => ({
          ...prevData,
          img: imageLink,
        }));
      }
      // console.log(e);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await RegisterUser(formData);
      if (res.success) {
        toast.success(res.message || " user create success");
        return router.push("/login");
      } else {
        return toast.error(res.message || " user create failed");
      }
    } catch (err: any) {
      toast.error(err.message || "user create failed");
    }
    // Form submission logic goes here
    console.log(formData);
  };
  console.log(formData);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Sing Up Here
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Input
              type="tel"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
          <div className="mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files?.[0])}
              required
              className="w-full bg-white border border-gray-300 rounded-md p-2"
            />
          </div>
          {/* Image preview */}
          {formData.img && (
            <div className="mb-4">
              <figure>
                <Image
                  src={formData.img}
                  alt="Image Preview"
                  className=" rounded-md"
                  width={200}
                  height={200}
                />
              </figure>
            </div>
          )}
          <Button type="submit" className="w-full">
            Sing Up
          </Button>
          <p className="mt-4">
            {`${`haven't`}`} a account please{" "}
            <Link className="font-semibold text-blue-500" href={`/login`}>
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
