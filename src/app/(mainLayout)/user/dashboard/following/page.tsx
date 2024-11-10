/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUnFollowMutation } from "@/redux/api/userApi";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { toast } from "sonner";

const Following = () => {
  const user = useAppSelector((state) => state.userSlice.user);

  const [unFollow] = useUnFollowMutation();

  // handle UN Follow;
  const handleUnFollow = async (followedId: string) => {
    try {
      const res = await unFollow({ followedId }).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (err: any) {
      toast.error(err.message || "following failed");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center">loading user </div>
    );
  }

  return (
    user &&
    user?.totalFollowing.length !== undefined &&
    user?.totalFollowing.length > 0 && (
      <Table className="border">
        <TableCaption>A list of your Follower</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow className="px-5">
            <TableHead>Img</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {user?.totalFollowing.map((author, i) => (
            <TableRow className="border-b-2" key={i}>
              <TableCell className="font-medium">
                <Image
                  className="rounded-full border-2 h-16 w-16 object-cover"
                  height={100}
                  width={100}
                  src={author.img}
                  alt={`${author.name} img`}
                />
              </TableCell>
              <TableCell>{author.name}</TableCell>
              <TableCell>
                <button onClick={() => handleUnFollow(author._id)}>
                  Un follow
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  );
};

export default Following;
