"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import { LoginUser } from "@/utils/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setToken, setUser } from "@/redux/userSlice";
import { useAppDispatch } from "@/redux/hooks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    const res = await LoginUser({ email, password });

    if (res.success) {
      dispatch(setUser(res.data));
      dispatch(setToken(res.token));
      router.push("/");
      return;
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Sign In Here
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="mb-6">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="mb-6">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <p className="mt-4">
              {`${`haven't`}`} a account please{" "}
              <Link className="font-semibold text-blue-500" href={`/register`}>
                Sign Up
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
