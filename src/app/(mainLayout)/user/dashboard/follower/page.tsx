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
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";

const Follower = () => {
  const user = useAppSelector((state) => state.userSlice.user);

  if (!user) {
    return (
      <div className="flex items-center justify-center">loading user </div>
    );
  }

  return (
    user &&
    user?.totalFollower.length !== undefined &&
    user?.totalFollower.length > 0 && (
      <Table className="border">
        <TableCaption>A list of your Follower</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow className="px-5">
            <TableHead>Img</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {user?.totalFollower.map((author, i) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  );
};

export default Follower;
