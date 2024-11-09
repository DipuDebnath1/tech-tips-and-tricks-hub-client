/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useBlockUserMutation,
  useChangeRoleMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
  useRestoreUserMutation,
  useUnBlockUserMutation,
} from "@/redux/api/adminApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/utils/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageUsers = () => {
  const { data, isLoading } = useGetAllUserQuery("");
  const [blockUser, { isLoading: blockLoading }] = useBlockUserMutation();
  const [unBlockUser, { isLoading: unBlockLoading }] = useUnBlockUserMutation();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
  const [restoreUser, { isLoading: restoreLoading }] = useRestoreUserMutation();
  const [changeRole, { isLoading: changeRoleLoading }] =
    useChangeRoleMutation();
  const [targetActionId, setTargetActionId] = useState("");
  const [targetRoleId, setTargetRoleId] = useState("");
  const [allUser, setAllUser] = useState<TUser[]>();
  const admin = useAppSelector((state) => state.userSlice.user);
  useEffect(() => {
    if (data?.success) {
      setAllUser(data?.data);
    }
  }, [data]);

  if (isLoading) {
    return <div className="flex items-center justify-center">loading user</div>;
  }

  // blok user
  const handleBlockUser = async (userId: string) => {
    setTargetActionId(userId);
    try {
      const res = await blockUser({ userId }).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // un blok user
  const handleUnBlockUser = async (userId: string) => {
    setTargetActionId(userId);
    try {
      const res = await unBlockUser({ userId }).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // un blok user
  const handleDeleteUser = async (userId: string) => {
    setTargetActionId(userId);
    try {
      const res = await deleteUser({ userId }).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  // un blok user
  const handleRestoreUser = async (userId: string) => {
    setTargetActionId(userId);
    try {
      const res = await restoreUser({ userId }).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  //update user role
  const handleUpdateUserRole = async (
    userId: string,
    role: "admin" | "user"
  ) => {
    setTargetRoleId(userId);
    try {
      const res = await changeRole({ userId, role }).unwrap();
      console.log(res);
      if (res.success) {
        return toast.success(res.message);
      }
    } catch (err: any) {
      toast.error(err.data.message || "user role change false");
    }
  };

  return (
    allUser?.length !== undefined &&
    allUser?.length > 0 && (
      <Table className="border">
        <TableHeader className="bg-gray-100">
          <TableRow className="px-5">
            <TableHead>Img</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Change Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {allUser?.map((author, i) => (
            <TableRow
              className={`border-b-2 ${
                (author.isBlocked || author.isDeleted) &&
                "bg-red-200 hover:bg-red-200"
              } ${author.role === "admin" && "font-semibold"}`}
              key={i}
            >
              {/* author img  */}
              <TableCell className="font-medium">
                <Image
                  className="rounded-full border-2 h-16 w-16 object-cover"
                  height={100}
                  width={100}
                  src={author.img}
                  alt={`${author.name} img`}
                />
              </TableCell>
              {/* name  */}
              <TableCell className={`${author.isBlocked && "text-red-600"} `}>
                <div className="flex items-center gap-2">
                  {author.name}{" "}
                  {author.role === "admin" && <strong>(admin)</strong>}
                  {author?.isVerified && (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5  text-blue-800 shadow-2xl"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </TableCell>
              {/* email */}
              <TableCell className={`${author.isBlocked && "text-red-600"}`}>
                {author.email}
              </TableCell>
              {/* role  */}
              <TableCell>
                {admin?._id !== author._id && (
                  <div>
                    {author.role === "admin" ? (
                      <Button
                        disabled={author.isDeleted || author.isBlocked}
                        onClick={() => handleUpdateUserRole(author._id, "user")}
                        className="bg-green-600 hover:bg-green-800"
                      >
                        {changeRoleLoading && targetRoleId === author._id
                          ? "process"
                          : "make user"}
                      </Button>
                    ) : (
                      <Button
                        disabled={author.isDeleted || author.isBlocked}
                        onClick={() =>
                          handleUpdateUserRole(author._id, "admin")
                        }
                        className="bg-green-600 hover:bg-green-800"
                      >
                        {changeRoleLoading && targetRoleId === author._id
                          ? "process"
                          : "make admin"}
                      </Button>
                    )}
                  </div>
                )}
              </TableCell>
              {/* action  */}
              <TableCell>
                {admin?._id !== author._id && (
                  <div className="space-x-2">
                    {/* blocking */}
                    {author.isBlocked ? (
                      <Button
                        disabled={author.isDeleted}
                        onClick={() => handleUnBlockUser(author._id)}
                        className="bg-yellow-700 hover:bg-yellow-800"
                      >
                        {unBlockLoading && targetActionId === author._id
                          ? "process"
                          : "Unblock"}
                      </Button>
                    ) : (
                      <Button
                        disabled={author.isDeleted}
                        onClick={() => handleBlockUser(author._id)}
                        className="bg-yellow-700 hover:bg-yellow-800"
                      >
                        {blockLoading && targetActionId === author._id
                          ? "process"
                          : "Block"}
                      </Button>
                    )}

                    {/* deleting */}
                    {author.isDeleted ? (
                      <Button
                        onClick={() => handleRestoreUser(author._id)}
                        className="bg-red-700 hover:bg-red-800"
                      >
                        {restoreLoading && targetActionId === author._id
                          ? "process"
                          : "restore"}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleDeleteUser(author._id)}
                        className="bg-red-700 hover:bg-red-800"
                      >
                        {deleteLoading && targetActionId === author._id
                          ? "process"
                          : "delete"}
                      </Button>
                    )}
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  );
};

export default ManageUsers;
