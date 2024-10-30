export type TUser = {
  createdAt: string;
  email: string;
  img: string;
  isBlocked: boolean;
  isPremium: boolean;
  isVerified: boolean;
  name: string;
  phone: string;
  role: "user" | "admin";
  totalFollower: number;
  totalFollowing: number;
  updatedAt: string;
  _id: string;
  __v: number;
};

export interface TPost {
  _id: string;
  author: TUser;
  title: string;
  content: string;
  images: string;
  category: string;
  tags: string[];
  isPremium: boolean;
  upVotes: string[];
  downVotes: string[];
  comments: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TComment {
  _id: string;
  author: TUser;
  post: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
