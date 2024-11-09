export type TUserWithFollowers = {
  createdAt: string;
  email: string;
  img: string;
  isBlocked: boolean;
  isDeleted: boolean;
  isPremium: boolean;
  isVerified: boolean;
  name: string;
  phone: string;
  role: "user" | "admin";
  totalFollower: TUser[];
  totalFollowing: TUser[];
  updatedAt: string;
  _id: string;
  __v: number;
};

export type TUser = {
  createdAt: string;
  email: string;
  img: string;
  isBlocked: boolean;
  isDeleted: boolean;
  isPremium: boolean;
  isVerified: boolean;
  name: string;
  phone: string;
  role: "user" | "admin";
  totalFollower: string[];
  totalFollowing: string[];
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
  isDeleted?: boolean;
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

export interface TPostData {
  title?: string;
  content?: string;
  images?: string;
  category?:
    | "Web"
    | "Software Engineering"
    | "AI"
    | "Hardware"
    | "Mobile Apps"
    | "Tech Gadgets";
  tags?: [string];
  isPremium?: boolean;
}
